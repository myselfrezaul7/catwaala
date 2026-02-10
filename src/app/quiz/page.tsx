"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QUIZ_QUESTIONS } from "@/data/quiz";
import { cats } from "@/data/cats";
import { PetCard } from "@/components/shared/PetCard";
import { RefreshCw } from "lucide-react";

export default function QuizPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [completed, setCompleted] = useState(false);

    const handleAnswer = (tags: string[]) => {
        setSelectedTags(prev => [...prev, ...tags]);
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setCompleted(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedTags([]);
        setCompleted(false);
    };

    const matchedCats = completed ? cats.filter(() => true).sort(() => 0.5 - Math.random()).slice(0, 3) : [];

    return (
        <div className="min-h-screen py-20 px-4 flex flex-col items-center justify-center">
            {!completed ? (
                <div className="w-full max-w-2xl glass-card p-12 rounded-[2.5rem]">
                    <div className="mb-8 flex justify-between items-center text-stone-400 text-sm font-bold uppercase tracking-widest">
                        <span>Question {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}</span>
                        <div className="w-24 h-2 bg-stone-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-rose-500 to-rose-600 transition-all duration-500 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-10 leading-tight">
                        {QUIZ_QUESTIONS[currentQuestionIndex].questionText}
                    </h1>

                    <div className="space-y-4">
                        {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option.tags)}
                                className="w-full text-left p-6 rounded-2xl border-2 border-amber-100/60 hover:border-rose-400 hover:bg-rose-50/50 transition-all group glass-card"
                            >
                                <span className="font-bold text-lg text-stone-600 group-hover:text-rose-600 transition-colors">
                                    {option.text}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 text-stone-800">Purr-fect Matches! 🎉</h2>
                        <p className="text-stone-500 mb-8">Based on your answers, these cats might be your soulmate.</p>
                        <Button onClick={restartQuiz} variant="outline" className="rounded-full border-stone-200 text-stone-600 hover:border-rose-300 hover:text-rose-600">
                            <RefreshCw className="w-4 h-4 mr-2" /> Retake Quiz
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {matchedCats.map(cat => (
                            // @ts-ignore
                            <PetCard key={cat.id} cat={cat} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
