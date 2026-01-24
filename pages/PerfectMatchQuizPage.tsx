
import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPerfectMatch } from '../services/geminiService';
import { MOCK_ANIMALS } from '../constants';
import type { Animal } from '../types';
import AnimalCard from '../components/AnimalCard';
import { SparklesIcon } from '../components/icons';
import Alert from '../components/Alert';
import PawHeartLoader from '../components/PawHeartLoader';
import { useLanguage } from '../contexts/LanguageContext';

interface MatchResult {
    animalId: number;
    reasoning: string;
}

const PerfectMatchQuizPage: React.FC = () => {
    const { t } = useLanguage();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<MatchResult[]>([]);
    const [error, setError] = useState('');

    const quizQuestions = useMemo(() => [
        {
            question: t('quiz.q1.question'),
            options: [t('quiz.q1.options.0'), t('quiz.q1.options.1'), t('quiz.q1.options.2')],
            key: 'energy'
        },
        {
            question: t('quiz.q2.question'),
            options: [t('quiz.q2.options.0'), t('quiz.q2.options.1'), t('quiz.q2.options.2')],
            key: 'livingSituation'
        },
        {
            question: t('quiz.q3.question'),
            options: [t('quiz.q3.options.0'), t('quiz.q3.options.1'), t('quiz.q3.options.2'), t('quiz.q3.options.3')],
            key: 'household'
        },
        {
            question: t('quiz.q4.question'),
            options: [t('quiz.q4.options.0'), t('quiz.q4.options.1'), t('quiz.q4.options.2')],
            key: 'personality'
        }
    ], [t]);


    const handleSubmit = useCallback(async (finalAnswers: Record<string, string>) => {
        setIsLoading(true);
        setError('');
        setResults([]);
        
        const preferencesString = Object.entries(finalAnswers)
            .map(([key, value]) => `${quizQuestions.find(q=>q.key === key)?.question}: ${value}`)
            .join('. ');
        
        try {
            const responseText = await getPerfectMatch(preferencesString, MOCK_ANIMALS);
            const parsedResponse = JSON.parse(responseText);
            if(parsedResponse.matches && parsedResponse.matches.length > 0) {
                setResults(parsedResponse.matches);
            } else {
                 setError(t('quiz.noMatchError'));
            }
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? t(`errors.${err.message}`, { default: err.message }) : t('errors.unknown');
            setError(`${errorMessage} ${t('errors.tryAgain')}`);
        } finally {
            setIsLoading(false);
        }
    }, [t, quizQuestions]);

    const handleAnswer = useCallback((key: string, option: string) => {
        const newAnswers = { ...answers, [key]: option };
        setAnswers(newAnswers);
        if (step < quizQuestions.length - 1) {
            setStep(step + 1);
        } else {
            handleSubmit(newAnswers);
        }
    }, [step, answers, handleSubmit, quizQuestions.length]);

    const handleRestart = useCallback(() => {
        setStep(0);
        setAnswers({});
        setResults([]);
        setError('');
    }, []);

    const matchedAnimals = results.map(result => {
        const animal = MOCK_ANIMALS.find(a => a.id === result.animalId);
        return { ...animal, reasoning: result.reasoning };
    }).filter(a => a.id !== undefined) as (Animal & { reasoning: string })[];

    return (
        <div className="container mx-auto px-6 py-12 flex-grow flex items-center justify-center">
            <div className="w-full max-w-3xl">
                <div className="bg-slate-100/30 dark:bg-slate-800/30 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 p-8 md:p-12 rounded-2xl shadow-xl">
                    {results.length === 0 && !isLoading && !error && (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">{t('quiz.title')}</h1>
                                <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">{t('quiz.subtitle')}</p>
                                <div className="w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full h-2.5 mt-6">
                                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${((step + 1) / quizQuestions.length) * 100}%`, transition: 'width 0.3s ease-in-out' }}></div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-center text-slate-700 dark:text-slate-200">{quizQuestions[step].question}</h2>
                                <div className="mt-8 grid grid-cols-1 gap-4">
                                    {quizQuestions[step].options.map(option => (
                                        <button
                                            key={option}
                                            onClick={() => handleAnswer(quizQuestions[step].key, option)}
                                            className="w-full text-left p-5 bg-slate-200/50 dark:bg-slate-700/50 rounded-lg text-lg font-medium text-slate-800 dark:text-slate-100 hover:bg-orange-500/20 hover:ring-2 hover:ring-orange-500 transition-all duration-200"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    
                    {isLoading && (
                        <div className="py-10">
                            <PawHeartLoader 
                                text={t('quiz.loading.title')} 
                                subText={t('quiz.loading.subtitle')} 
                            />
                        </div>
                    )}
                    
                    {error && !isLoading && (
                         <div className="text-center py-10">
                            <Alert type="error" title={t('quiz.error.title')} message={error} />
                            <div className="mt-8 flex justify-center gap-4">
                                <button onClick={handleRestart} className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600">{t('quiz.error.tryAgainButton')}</button>
                                <Link to="/adopt" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 py-3 px-8 rounded-full hover:bg-slate-500/10">{t('quiz.error.browseAllButton')}</Link>
                            </div>
                        </div>
                    )}

                    {!isLoading && results.length > 0 && (
                        <div>
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">{t('quiz.results.title')}</h1>
                                <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">{t('quiz.results.subtitle')}</p>
                            </div>
                            <div className="space-y-8">
                                {matchedAnimals.map(animal => (
                                    <div key={animal.id}>
                                        <div className="bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-lg mb-4">
                                            <p className="font-semibold text-orange-800 dark:text-orange-200"><SparklesIcon className="w-5 h-5 inline-block mr-2"/>{t('quiz.results.aiRecommendation')}</p>
                                            <p className="text-orange-700 dark:text-orange-300 italic">"{animal.reasoning}"</p>
                                        </div>
                                        <AnimalCard animal={animal} />
                                    </div>
                                ))}
                            </div>
                             <div className="text-center mt-12">
                                <button onClick={handleRestart} className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600">{t('quiz.results.startOverButton')}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PerfectMatchQuizPage;
