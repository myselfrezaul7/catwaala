import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ChatMessage } from '../types';

// Safety check for process.env in purely browser environments
const apiKey = import.meta.env.VITE_API_KEY;

// Initialize AI lazily
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

if (!apiKey) {
    console.warn("API_KEY environment variable (VITE_API_KEY) is not set. AI features will respond with mock errors.");
}

const SYSTEM_INSTRUCTION_EN = `You are an AI Vet for CATWAALA, a cat welfare organization. Your purpose is to provide general guidance and first-aid information ONLY for cats.
Always start every single response with this exact disclaimer, on its own line: '***Disclaimer: I am an AI Vet and not a substitute for professional veterinary advice. This information is for general guidance and first-aid purposes only. ALWAYS consult a licensed, in-person veterinarian for any health concerns or emergencies.***'

Your primary functions are:
1.  Provide helpful, general advice on cat care and basic first-aid steps in English. Do not provide any diagnosis or prescribe medication. Keep your answers concise and easy to understand.
2.  If a user asks for a checklist for a new pet (e.g., "what do I need for a new kitten?"), you MUST generate a comprehensive checklist formatted with markdown. The checklist should be organized into three sections with these exact titles:
    - ### 🛍️ Shopping List
    - ### ✅ To-Do List
    - ### 🏡 First Week Tips
    Use bullet points (-) for each item within these sections.`;

const SYSTEM_INSTRUCTION_BN = `আপনি ক্যাটওয়ালা (CATWAALA) নামক একটি বিড়াল কল্যাণ সংস্থার AI ভেট অ্যাসিস্ট্যান্ট। আপনার মূল কাজ হলো ব্যবহারকারীদের বিড়ালের যত্ন ও সাধারণ প্রাথমিক চিকিৎসা সম্পর্কে পরামর্শ দেওয়া।
সর্বদা প্রতিটি উত্তরের শুরুতে এই সতর্কবার্তাটি হুবহু একটি নতুন লাইনে লিখবেন: '***সতর্কতা: আমি একজন AI ভেট, কোনো পেশাদার পশুচিকিৎসক নই। আমার দেওয়া তথ্যগুলো শুধুমাত্র সাধারণ পরামর্শ ও প্রাথমিক চিকিৎসার জন্য। গুরুতর অসুস্থতা বা জরুরি প্রয়োজনে অবশ্যই একজন অভিজ্ঞ পশুচিকিৎসকের পরামর্শ নিন।***'

আপনার প্রধান দায়িত্বগুলো হলো:
১. বিড়ালের যত্ন এবং প্রাথমিক চিকিৎসার ধাপগুলো সম্পর্কে সহজ ও সাবলীল বাংলায় পরামর্শ দেওয়া। কোনো রোগ নির্ণয় করবেন না বা ঔষধ লিখে দেবেন না। আপনার উত্তরগুলো সংক্ষিপ্ত এবং সহজে বোধগম্য রাখুন।
২. যদি কোনো ব্যবহারকারী নতুন বিড়ালের জন্য একটি চেকলিস্ট চায় (যেমন, "নতুন বিড়ালছানার জন্য আমার কী কী প্রয়োজন?"), আপনাকে অবশ্যই মার্কডাউন ফরম্যাটে একটি সুন্দর চেকলিস্ট তৈরি করতে হবে। চেকলিস্টটি এই তিনটি শিরোনামের অধীনে সাজান:
    - ### 🛍️ কেনাকাটার তালিকা
    - ### ✅ করণীয় তালিকা
    - ### 🏡 প্রথম সপ্তাহের টিপস
    এই বিভাগগুলোর মধ্যে প্রতিটি পয়েন্টের জন্য বুলেট পয়েন্ট (-) ব্যবহার করুন।`;


const buildGeminiContent = (history: ChatMessage[]) => {
    return history.map(message => ({
        role: message.sender === 'ai' ? 'model' : 'user',
        parts: [{ text: message.text }],
    }));
};

const fileToPart = async (file: File) => {
    return new Promise<{ inlineData: { data: string; mimeType: string } }>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            resolve({
                inlineData: {
                    data: base64String,
                    mimeType: file.type
                }
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const getVetAssistantResponseStream = async function* (history: ChatMessage[], language: 'en' | 'bn') {
    if (!genAI) {
        yield language === 'bn'
            ? "API কী কনফিগার করা হয়নি। দয়া করে প্রশাসকের সাথে যোগাযোগ করুন।"
            : "API Key is not configured. Please contact the administrator.";
        return;
    }

    try {
        const contents = buildGeminiContent(history);
        const systemInstruction = language === 'bn' ? SYSTEM_INSTRUCTION_BN : SYSTEM_INSTRUCTION_EN;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: systemInstruction
        });

        const result = await model.generateContentStream({
            contents: contents,
        });

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
                yield chunkText;
            }
        }

    } catch (error) {
        console.error("Error generating content from Gemini:", error);
        if (error instanceof Error && error.message.includes('API key not valid')) {
            yield language === 'bn'
                ? "দুঃখিত, অ্যাপ্লিকেশন কনফিগারেশনে একটি সমস্যা হয়েছে বলে মনে হচ্ছে। দয়া করে সাইট প্রশাসকের সাথে যোগাযোগ করুন।"
                : "I'm sorry, but there seems to be an issue with the application configuration. Please contact the site administrator.";
        } else {
            yield language === 'bn'
                ? "দুঃখিত, আপনার অনুরোধ প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে। এটি একটি নেটওয়ার্ক সমস্যার কারণে হতে পারে। দয়া করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"
                : "I'm sorry, but an error occurred while processing your request. This could be due to a network issue. Please check your internet connection and try again.";
        }
    }
};

export const analyzeImageForReport = async (file: File) => {
    if (!genAI) {
        console.error("Gemini API Key is not configured (VITE_API_KEY)");
        throw new Error("AI service is not configured. Please contact support.");
    }

    try {
        const imagePart = await fileToPart(file);

        const prompt = `Analyze this image for a cat rescue report.
        Identify the animal type (e.g., Cat, Dog, Bird, Other) and briefly describe its visible physical condition or injuries.
        Return the result in JSON format with keys: "animalType" and "condition".`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent([
            prompt, imagePart
        ]);

        return result.response.text() || "{}";
    } catch (error) {
        console.error("Error analyzing image:", error);
        throw new Error("Failed to analyze image with AI.");
    }
};