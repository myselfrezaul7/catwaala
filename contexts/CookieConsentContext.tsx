import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

const COOKIE_CONSENT_KEY = 'catwaala_cookie_consent';

type ConsentStatus = 'pending' | 'necessary' | 'all';

interface CookieConsentContextType {
  consentStatus: ConsentStatus;
  setConsent: (status: 'necessary' | 'all') => void;
  hasConsent: (category: 'preferences' | 'functional') => boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const getInitialConsent = (): ConsentStatus => {
  try {
    const consentValue = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consentValue === 'all' || consentValue === 'necessary') {
      return consentValue;
    }
  } catch (error) {
    console.error("Could not read cookie consent from localStorage", error);
  }
  return 'pending';
};

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(getInitialConsent);

  const setConsent = useCallback((status: 'necessary' | 'all') => {
    try {
      // This is a necessary cookie to remember the user's choice.
      window.localStorage.setItem(COOKIE_CONSENT_KEY, status);
      setConsentStatus(status);
    } catch (error) {
      console.error("Could not save cookie consent to localStorage", error);
      // Update state anyway to unblock user
      setConsentStatus(status);
    }
  }, []);

  const hasConsent = useCallback((): boolean => {
    if (consentStatus === 'all') {
      return true;
    }
    // For this app, preferences and functional cookies are non-essential and grouped together under 'all'.
    return false;
  }, [consentStatus]);

  const value = useMemo(() => ({ consentStatus, setConsent, hasConsent }), [consentStatus, setConsent, hasConsent]);

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};
