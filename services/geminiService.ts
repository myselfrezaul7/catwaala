import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ChatMessage } from '../types';

// Safety check for process.env in purely browser environments
const apiKey = import.meta.env.VITE_API_KEY;

// Initialize AI lazily
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

if (!apiKey) {
    console.warn("API_KEY environment variable (VITE_API_KEY) is not set. AI features will respond with mock errors.");
}

- ### 🏡 প্রথম সপ্তাহের টিপস
    এই বিভাগগুলোর মধ্যে প্রতিটি পয়েন্টের জন্য বুলেট পয়েন্ট(-) ব্যবহার করুন।`;


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
    if (!genAI) throw new Error("API Key missing");

    try {
        const imagePart = await fileToPart(file);

        const prompt = `Analyze this image for an animal rescue report.
        Identify the animal type(e.g., Dog, Cat, Bird, Other) and briefly describe its visible physical condition or injuries.
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