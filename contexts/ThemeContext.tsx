import * as React from 'react';
import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { useCookieConsent } from './CookieConsentContext';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to get the system's preferred theme, can be called without hooks.
const getSystemTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hasConsent } = useCookieConsent();
  const [theme, setTheme] = useState<Theme>(getSystemTheme);

  // This effect runs when consent status changes to load the theme from storage or system preference.
  useEffect(() => {
    let newTheme: Theme;
    if (hasConsent('preferences')) {
      try {
        const storedTheme = window.localStorage.getItem('theme');
        // Validate stored value is actually a valid Theme
        if (storedTheme === 'light' || storedTheme === 'dark') {
            newTheme = storedTheme;
        } else {
            newTheme = getSystemTheme();
        }
      } catch (error) {
        console.error("Could not read theme from localStorage:", error);
        newTheme = getSystemTheme();
      }
    } else {
      newTheme = getSystemTheme();
    }
    setTheme(newTheme);
  }, [hasConsent]);

  // This effect applies the theme to the DOM and saves/removes it from storage.
  useEffect(() => {
    try {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        
        if (hasConsent('preferences')) {
            try {
                localStorage.setItem('theme', theme);
            } catch (error) {
                console.error("Could not save theme to localStorage:", error);
            }
        } else {
            // Ensure theme is removed from storage if consent is not given for preferences
            try {
                localStorage.removeItem('theme');
            } catch (error) {
                console.error("Could not remove theme from localStorage:", error);
            }
        }
    } catch (e) {
        console.error("Error applying theme", e);
    }
  }, [theme, hasConsent]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};