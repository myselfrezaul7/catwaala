import * as React from 'react';
import { useState, useMemo, useCallback } from 'react';
import { QUIZ_QUESTIONS, MOCK_ANIMALS } from '../constants';
import AnimalCard from '../components/AnimalCard';
import { Link } from 'react-router-dom';

const QuizPage: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleAnswer = useCallback((tags: string[]) => {
        setSelectedTags(prevTags => [...new Set([...prevTags, ...tags])]);
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizCompleted(true);
        }
    }, [currentQuestionIndex]);

    const restartQuiz = useCallback(() => {
        setCurrentQuestionIndex(0);
        setSelectedTags([]);
        setQuizCompleted(false);
    }, []);

    const results = useMemo(() => {
        if (!quizCompleted || selectedTags.length === 0) return [];

        return MOCK_ANIMALS.filter(animal => {
            if (!animal.temperamentTags) return false;
            return selectedTags.some(tag => animal.temperamentTags?.includes(tag));
        }).sort((a, b) => {
            const aMatches = a.temperamentTags?.filter(t => selectedTags.includes(t)).length || 0;
            const bMatches = b.temperamentTags?.filter(t => selectedTags.includes(t)).length || 0;
            return bMatches - aMatches;
        });
    }, [quizCompleted, selectedTags]);

    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

    return (
        <div className="container mx-auto px-4 sm:px-6 py-20 min-h-[80vh] flex flex-col items-center justify-center">
            {!quizCompleted && (
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 drop-shadow-sm">Find Your Perfect Paw-tner</h1>
                    <p className="text-lg text-slate-700 dark:text-slate-200 max-w-2xl mx-auto">
                        Answer a few quick questions to discover which of our wonderful animals might be the best fit for you.
                    </p>
                </div>
            )}

            <div className={`w-full ${!quizCompleted ? 'max-w-2xl bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/30 dark:border-white/10 rounded-[3rem] shadow-2xl p-8 md:p-16' : 'max-w-6xl'}`}>
                {!quizCompleted ? (
                    <div>
                        <div className="mb-10 text-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-6 max-w-md mx-auto">
                                <div className="bg-orange-500 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}></div>
                            </div>
                            <span className="inline-block bg-white/50 dark:bg-white/10 text-slate-800 dark:text-slate-100 font-bold px-4 py-1 rounded-full text-sm mb-4 border border-white/20">
                                Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">{currentQuestion.questionText}</h2>
                        </div>
                        <div className="space-y-4">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option.tags)}
                                    className="w-full text-left bg-white/60 dark:bg-slate-800/60 p-6 rounded-2xl border-2 border-transparent hover:border-orange-400 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300 shadow-md group"
                                >
                                    <span className="text-xl font-medium text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{option.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Here are your matches!</h2>
                            <p className="text-xl text-slate-700 dark:text-slate-300">Based on your answers, these animals might be a great fit for your home.</p>
                            <div className="mt-8">
                                <button onClick={restartQuiz} className="bg-white dark:bg-white/10 border border-white/40 text-slate-900 dark:text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-all shadow-lg">
                                    Take Quiz Again
                                </button>
                            </div>
                        </div>
                        {results.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                                {results.map(animal => (
                                    <AnimalCard key={animal.id} animal={animal} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 p-16 rounded-[3rem] max-w-3xl mx-auto shadow-xl">
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">No exact matches right now</h3>
                                <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">We don't have a perfect match right now, but please check out all our available animals. The perfect friend for you might just be a click away!</p>
                                <Link to="/adopt" className="inline-block bg-orange-500 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30">
                                    View All Animals
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizPage;