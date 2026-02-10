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
            className="w-10 h-10 rounded-full font-bold text-sm bg-white/50 dark:bg-stone-800/50 border border-white/20 dark:border-stone-700/50 hover:bg-white/80 dark:hover:bg-stone-800 transition-all duration-300"
        >
            {language === 'en' ? 'BN' : 'EN'}
        </Button>
    );
}
