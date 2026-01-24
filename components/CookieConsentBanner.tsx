import * as React from 'react';
import { useState } from 'react';
import { useCookieConsent } from '../contexts/CookieConsentContext';
import { useLanguage } from '../contexts/LanguageContext';
import CookieInfoModal from './CookieInfoModal';

const CookieConsentBanner: React.FC = () => {
  const { consentStatus, setConsent } = useCookieConsent();
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isVisible = consentStatus === 'pending';
  
  if (!isVisible) {
      return null;
  }

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-500 ease-in-out animate-fadeIn"
        role="dialog"
        aria-live="polite"
        aria-label="Cookie Consent Banner"
        hidden={!isVisible}
      >
        <div className="container mx-auto max-w-4xl bg-white/60 dark:bg-slate-900/70 backdrop-blur-xl border border-white/30 dark:border-slate-700 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-800 dark:text-slate-200 text-center md:text-left flex-grow">
            {t('cookieBanner.text')}{' '}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="font-semibold text-orange-600 dark:text-orange-400 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
            >
              {t('cookieBanner.learnMore')}
            </button>
          </p>
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => setConsent('necessary')}
              className="font-bold py-2 px-6 rounded-full text-sm bg-slate-200/70 dark:bg-slate-700/70 text-slate-800 dark:text-slate-100 hover:bg-slate-300/80 dark:hover:bg-slate-600/80 transition-colors"
            >
              {t('cookieBanner.acceptNecessary')}
            </button>
            <button
              onClick={() => setConsent('all')}
              className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full text-sm hover:bg-orange-600 transition-colors"
            >
              {t('cookieBanner.acceptAll')}
            </button>
          </div>
        </div>
      </div>
      <CookieInfoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CookieConsentBanner;