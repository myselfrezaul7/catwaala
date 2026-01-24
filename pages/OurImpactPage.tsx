
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_IMPACT_STATS } from '../constants';
import useCountUp from '../hooks/useCountUp';
import { CatIcon, HeartIcon } from '../components/icons';
import DonationModal from '../components/DonationModal';
import { useLanguage } from '../contexts/LanguageContext';

const StatCard: React.FC<{ value: number, label: string, icon: React.ReactNode }> = ({ value, label, icon }) => {
    const count = useCountUp(value, 2000);
    return (
        <div className="bg-slate-100/30 dark:bg-slate-800/30 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-xl p-3 sm:p-6 text-center flex flex-col items-center justify-center">
            <div className="text-orange-500 mb-2 sm:mb-3 transform scale-75 sm:scale-100">{icon}</div>
            <p className="text-2xl sm:text-5xl font-extrabold text-slate-800 dark:text-slate-100">{count.toLocaleString()}</p>
            <p className="text-xs sm:text-lg font-semibold text-slate-600 dark:text-slate-400 mt-1">{label}</p>
        </div>
    );
};

const OurImpactPage: React.FC = () => {
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const { t } = useLanguage();
    const { rescuedThisYear, successfulAdoptions, mealsProvided, shelterFundGoal, shelterFundCurrent } = MOCK_IMPACT_STATS;
    const shelterFundProgress = useCountUp(Math.round((shelterFundCurrent / shelterFundGoal) * 100), 2500);
    const raisedAmount = useCountUp(shelterFundCurrent);

    return (
    <>
        <div className="container mx-auto px-2 sm:px-6 py-8 md:py-16">
            <div className="text-center mb-8 md:mb-16 px-4">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-slate-100">{t('ourImpact.title')}</h1>
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-2 md:mt-4">
                    {t('ourImpact.subtitle')}
                </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8">
                <StatCard value={rescuedThisYear} label={t('ourImpact.stats.rescued')} icon={<CatIcon className="w-10 h-10 sm:w-12 sm:h-12" />} />
                <StatCard value={successfulAdoptions} label={t('ourImpact.stats.adoptions')} icon={<HeartIcon className="w-10 h-10 sm:w-12 sm:h-12" />} />
                <StatCard value={mealsProvided} label={t('ourImpact.stats.meals')} icon={<CatIcon className="w-10 h-10 sm:w-12 sm:h-12" />} />
            </div>

            <div className="mt-12 sm:mt-16 text-center px-4">
                <Link 
                    to="/happy-tails" 
                    className="inline-block bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600/50 shadow-lg rounded-full py-3 px-8 sm:py-4 sm:px-10 transform hover:scale-105 active:scale-95 transition-transform duration-300 w-full sm:w-auto"
                >
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">{t('ourImpact.happyTails.title')}</h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">{t('ourImpact.happyTails.subtitle')}</p>
                </Link>
            </div>

            <div className="mt-12 sm:mt-16 bg-slate-100/30 dark:bg-slate-800/30 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-xl p-6 sm:p-12 text-center mx-2 sm:mx-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3 sm:mb-4">{t('ourImpact.shelter.title')}</h2>
                <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6 sm:mb-8">
                    {t('ourImpact.shelter.subtitle')}
                </p>

                <div className="w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full h-6 sm:h-8 overflow-hidden">
                    <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-center text-white font-bold text-xs sm:text-base"
                        style={{ width: `${shelterFundProgress}%` }}
                    >
                       {shelterFundProgress > 10 && `${shelterFundProgress}%`}
                    </div>
                </div>
                <div className="flex justify-between items-center mt-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>${raisedAmount.toLocaleString()} {t('ourImpact.shelter.raised')}</span>
                    <span>{t('ourImpact.shelter.goal')}: ${shelterFundGoal.toLocaleString()}</span>
                </div>
                 <button 
                    onClick={() => setIsDonationModalOpen(true)}
                    className="mt-6 sm:mt-8 bg-red-500 text-white font-bold py-3 px-8 rounded-full text-base sm:text-lg hover:bg-red-600 transition-transform transform hover:scale-105 active:scale-95 duration-300 shadow-lg w-full sm:w-auto"
                 >
                    {t('ourImpact.shelter.button')}
                </button>
            </div>
        </div>
        <DonationModal
            isOpen={isDonationModalOpen}
            onClose={() => setIsDonationModalOpen(false)}
        />
    </>
  );
};

export default OurImpactPage;
