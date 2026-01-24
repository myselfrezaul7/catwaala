import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageIcon } from './icons';

const LanguageSwitcher: React.FC = () => {
    const { language, changeLanguage } = useLanguage();
    
    const handleToggle = () => {
        changeLanguage(language === 'en' ? 'bn' : 'en');
    };

    return (
        <button
            onClick={handleToggle}
            className="flex items-center space-x-2 p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-500/10"
            aria-label="Change language"
        >
            <LanguageIcon className="w-6 h-6" />
            <span className="font-semibold text-sm uppercase">{language}</span>
        </button>
    );
};

export default LanguageSwitcher;
