import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { useCookieConsent } from './CookieConsentContext';
import { en, bn } from '../i18n/translations';

type Language = 'en' | 'bn';
type Translations = typeof en;

const translations: Record<Language, Translations> = { en, bn };

const LANGUAGE_STORAGE_KEY = 'catwaala_language';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof Translations, options?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to get the system's preferred language, can be called without hooks.
const getSystemLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    try {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'bn') {
        return 'bn';
      }
    } catch (e) {
      console.warn("Could not determine system language", e);
    }
  }
  return 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hasConsent } = useCookieConsent();
  const [language, setLanguage] = useState<Language>(getSystemLanguage);

  // This effect runs when consent status changes to load the language from storage or system preference.
  useEffect(() => {
    let newLanguage: Language;
    if (hasConsent('preferences')) {
      try {
        const storedLang = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
        // Validate
        if (storedLang === 'en' || storedLang === 'bn') {
          newLanguage = storedLang;
        } else {
          newLanguage = getSystemLanguage();
        }
      } catch (error) {
        console.error("Could not read language from localStorage:", error);
        newLanguage = getSystemLanguage();
      }
    } else {
      newLanguage = getSystemLanguage();
    }
    setLanguage(newLanguage);
  }, [hasConsent]);

  // This effect applies the language to the DOM and saves/removes it from storage.
  useEffect(() => {
    try {
      document.documentElement.lang = language;
      if (hasConsent('preferences')) {
        try {
          localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        } catch (error) {
          console.error("Could not save language to localStorage:", error);
        }
      } else {
        // Ensure language is removed from storage if consent is not given for preferences
        try {
          localStorage.removeItem(LANGUAGE_STORAGE_KEY);
        } catch (error) {
          console.error("Could not remove language from localStorage:", error);
        }
      }
    } catch (e) {
      console.error("Error applying language", e);
    }
  }, [language, hasConsent]);

  const t = useCallback((key: keyof Translations, options?: { [key: string]: string | number }) => {
    const currentDict = translations[language] || translations['en'];
    let translation = currentDict[key] || translations['en'][key] || key;

    if (options && typeof translation === 'string') {
      Object.keys(options).forEach(optionKey => {
        translation = translation.replace(`{{${optionKey}}}`, String(options[optionKey]));
      });
    }
    return translation;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};