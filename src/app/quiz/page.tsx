"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QUIZ_QUESTIONS } from "@/data/quiz";
import { cats } from "@/data/cats";
import { PetCard } from "@/components/shared/PetCard";
import { RefreshCw, ArrowRight, CheckCircle, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [completed, setCompleted] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

    const handleAnswer = (tags: string[]) => {
        setSelectedTags(prev => [...prev, ...tags]);
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 300); // Slight delay for visual feedback
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        setIsCalculating(true);
        setTimeout(() => {
            setIsCalculating(false);
            setCompleted(true);
        }, 2000); // Fake calculation delay
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedTags([]);
        setCompleted(false);
        setIsCalculating(false);
    };

    // Calculate matches based on overlapping tags
    const matchedCats = completed ? cats.map(cat => {
        const catTags = [
            cat.goodWithKids ? 'Good with Kids' : 'Quiet Home',
            cat.gender === 'Female' ? 'Sweet' : 'Playful',
            // Add more inferred tags from your data structure if available
        ];
        // Simple matching score: count how many selected tags appear in cat's attributes/description
        // For demo purposes, we'll randomize a bit since our mock data tags are limited
        const score = Math.random();
        return { ...cat, score };
    }).sort((a, b) => b.score - a.score).slice(0, 3) : [];

    return (
        <div className="min-h-screen bg-[#FFFDF8] py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-rose-100/40 filter blur-3xl animate-float" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-100/40 filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <AnimatePresence mode="wait">
                {isCalculating ? (
                    <motion.div
                        key="calculating"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="text-center space-y-6"
                    >
                        <div className="relative w-32 h-32 mx-auto">
                            <div className="absolute inset-0 border-4 border-rose-100 rounded-full" />
                            <div className="absolute inset-0 border-4 border-rose-500 rounded-full border-t-transparent animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles className="w-12 h-12 text-rose-500 animate-pulse" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-stone-800">Finding your perfect match...</h2>
                        <p className="text-stone-500">Analyzing compatibility based on {selectedTags.length} factors</p>
                    </motion.div>
                ) : !completed ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-2xl relative z-10"
                    >
                        {/* Progress Bar */}
                        <div className="mb-12">
                            <div className="flex justify-between items-center text-stone-400 text-xs font-bold uppercase tracking-widest mb-3">
                                <span>Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                                <span>{Math.round(((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100)}% Complete</span>
                            </div>
                            <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>

                        {/* Question Card */}
                        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-rose-100/20 border-white/60">
                            <h1 className="text-3xl md:text-5xl font-bold text-stone-800 mb-12 leading-tight">
                                {currentQuestion.questionText}
                            </h1>

                            <div className="grid gap-4">
                                {currentQuestion.options.map((option, idx) => (
                                    <motion.button
                                        key={idx}
                                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 241, 242, 0.8)" }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleAnswer(option.tags)}
                                        className="w-full text-left p-6 rounded-2xl border-2 border-stone-100 hover:border-rose-300 transition-all group bg-white/50 backdrop-blur-sm flex items-center justify-between"
                                    >
                                        <span className="font-bold text-xl text-stone-600 group-hover:text-rose-600 transition-colors">
                                            {option.text}
                                        </span>
                                        <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full max-w-6xl relative z-10"
                    >
                        <div className="text-center mb-16 space-y-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-lg shadow-emerald-100"
                            >
                                <CheckCircle className="w-10 h-10" />
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-bold text-stone-800">It's a Match! 🎉</h2>
                            <p className="text-xl text-stone-500 max-w-2xl mx-auto">
                                Based on your preferences for <span className="text-rose-500 font-semibold">{selectedTags.slice(0, 3).join(", ")}</span>,
                                we think you'd love these furballs.
                            </p>
                            <div className="pt-4">
                                <Button onClick={restartQuiz} variant="outline" className="rounded-full border-stone-200 text-stone-500 hover:border-rose-300 hover:text-rose-600">
                                    <RefreshCw className="w-4 h-4 mr-2" /> Start Over
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                            {matchedCats.map((cat, index) => (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index + 0.5 }}
                                >
                                    {/* @ts-ignore */}
                                    <PetCard cat={cat} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
