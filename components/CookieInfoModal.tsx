import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface CookieInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookieInfoModal: React.FC<CookieInfoModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trapping and Escape key handling for accessibility
  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        if (e.key !== 'Tab') return;

        if (e.shiftKey) { // Shift+Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="cookie-info-title">
      <div ref={modalRef} className="bg-white/60 dark:bg-slate-800/70 backdrop-blur-2xl border border-white/30 dark:border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-4">
            <h2 id="cookie-info-title" className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('modals.cookieInfo.title')}</h2>
            <button ref={closeButtonRef} onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-4xl font-light">&times;</button>
          </div>

          <div className="space-y-6 text-slate-800 dark:text-slate-200">
            <p>{t('modals.cookieInfo.intro')}</p>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">{t('modals.cookieInfo.necessary.title')}</h3>
              <p>{t('modals.cookieInfo.necessary.description')}</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm bg-white/20 dark:bg-black/20 p-3 rounded-md">
                <li><span className="font-semibold">catwaala_cookie_consent:</span> {t('modals.cookieInfo.necessary.cookie1')}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-orange-600 dark:text-orange-400 mb-2 flex items-center">
                <span className="bg-orange-100 dark:bg-orange-900/30 p-1.5 rounded-lg mr-2">
                  <span className="text-lg">⚙️</span>
                </span>
                {t('modals.cookieInfo.functional.title')}
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mb-2 text-sm">
                {t('modals.cookieInfo.functional.description')}
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 text-sm ml-2">
                <li><span className="font-semibold">catwaala_theme:</span> {t('modals.cookieInfo.functional.cookie1')}</li>
                <li><span className="font-semibold">catwaala_language:</span> {t('modals.cookieInfo.functional.cookie2')}</li>
                <li><span className="font-semibold">catwaala_favorites:</span> {t('modals.cookieInfo.functional.cookie3')}</li>
                <li><span className="font-semibold">catwaala_ai_chat_history:</span> {t('modals.cookieInfo.functional.cookie4')}</li>
                <li><span className="font-semibold">catwaala_posts:</span> {t('modals.cookieInfo.functional.cookie5')}</li>
                <li><span className="font-semibold">catwaala_memorials:</span> {t('modals.cookieInfo.functional.cookie6')}</li>
              </ul>
            </div>

            <p>{t('modals.cookieInfo.outro')}</p>
          </div>

          <div className="pt-5 mt-6 border-t border-slate-300 dark:border-slate-600">
            <div className="flex justify-end">
              <button onClick={onClose} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600">
                {t('modals.cookieInfo.closeButton')}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CookieInfoModal;
