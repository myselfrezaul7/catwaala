"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="w-9 h-9 rounded-full font-bold text-xs bg-white/50 dark:bg-stone-800/50 border border-white/20 dark:border-stone-700/50 hover:bg-white/80 dark:hover:bg-stone-800 transition-all duration-300 flex items-center justify-center p-0"
        >
            {language === 'en' ? 'BN' : 'EN'}
        </Button>
    );
}
