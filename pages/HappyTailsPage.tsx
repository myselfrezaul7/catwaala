
import React from 'react';
import { MOCK_HAPPY_TAILS } from '../constants';
import { HeartIcon } from '../components/icons';
import { useLanguage } from '../contexts/LanguageContext';

const HappyTailsPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-2 sm:px-6 py-8 md:py-16">
      <div className="text-center mb-8 md:mb-16 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100">{t('happyTails.title')}</h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-2 sm:mt-4">
          {t('happyTails.subtitle')}
        </p>
      </div>
      <div className="columns-2 sm:columns-2 lg:columns-3 gap-3 sm:gap-8 space-y-3 sm:space-y-8">
        {MOCK_HAPPY_TAILS.map(tail => (
          <div key={tail.id} className="break-inside-avoid bg-slate-100/30 dark:bg-slate-800/30 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-xl overflow-hidden group mb-3 sm:mb-8">
            <img src={tail.imageUrl} alt={tail.animalName} className="w-full h-auto object-cover" loading="lazy" />
            <div className="p-3 sm:p-6">
                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-base italic">"{tail.story}"</p>
                <div className="flex items-center justify-end mt-2 sm:mt-4 text-[10px] sm:text-sm">
                    <HeartIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-1 sm:mr-2" />
                    <p className="font-semibold text-slate-600 dark:text-slate-400">
                        {tail.animalName}, {t('happyTails.adoptedBy')} {tail.adopterName}
                    </p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HappyTailsPage;
