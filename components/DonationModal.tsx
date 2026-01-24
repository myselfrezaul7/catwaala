import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
// Icons removed as they are temporarily unused
import { useLanguage } from '../contexts/LanguageContext';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'mfs' | 'bank' | 'medicine'>('mfs');
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

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

  const TabButton: React.FC<{ tabName: 'mfs' | 'bank' | 'medicine'; children: React.ReactNode }> = ({ tabName, children }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      role="tab"
      aria-selected={activeTab === tabName}
      className={`py-2.5 px-4 w-1/3 text-center font-semibold rounded-t-lg transition-colors text-sm sm:text-base ${activeTab === tabName
        ? 'bg-white/30 dark:bg-black/30 text-orange-700 dark:text-orange-400'
        : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-black/20'
        }`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="donation-modal-title">
      <div ref={modalRef} className="bg-white/40 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/20 dark:border-slate-700 rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 relative">
          <h2 id="donation-modal-title" className="text-2xl font-bold text-slate-900 dark:text-slate-50 text-center">{t('modals.donation.title')}</h2>
          <p className="text-center text-slate-800 dark:text-slate-200 mt-1 mb-6">{t('modals.donation.subtitle')}</p>
          <button ref={closeButtonRef} onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-3xl font-light">&times;</button>

          <div className="flex bg-white/20 dark:bg-black/20 rounded-t-lg" role="tablist" aria-label="Donation Methods">
            <TabButton tabName="mfs">{t('modals.donation.tab.money')}</TabButton>
            <TabButton tabName="medicine">{t('modals.donation.tab.medicine')}</TabButton>
            <TabButton tabName="bank">{t('modals.donation.tab.bank')}</TabButton>
          </div>

          <div className="p-6 bg-white/30 dark:bg-black/30 border-x border-b border-white/30 dark:border-slate-700 rounded-b-lg">
            {activeTab === 'mfs' && (
              <div role="tabpanel" aria-labelledby="mfs-tab" className="space-y-6 text-center py-8">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-xl">
                  <h3 className="text-lg font-bold text-orange-800 dark:text-orange-200 mb-2">Coming Soon 🚧</h3>
                  <p className="text-slate-700 dark:text-slate-300">
                    We are currently setting up our Merchant Accounts for <span className="font-bold">bKash</span> and <span className="font-bold">Nagad</span>.
                  </p>
                  <p className="text-sm mt-3 text-slate-600 dark:text-slate-400">
                    Please check back in a few days!
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'medicine' && (
              <div role="tabpanel" aria-labelledby="medicine-tab" className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">{t('modals.donation.medicine.title')}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-200">
                  {t('modals.donation.medicine.text')}
                </p>
                <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-200 space-y-1 bg-white/20 dark:bg-black/20 p-3 rounded-md">
                  <li>{t('modals.donation.medicine.item1')}</li>
                  <li>{t('modals.donation.medicine.item2')}</li>
                  <li>{t('modals.donation.medicine.item3')}</li>
                  <li>{t('modals.donation.medicine.item4')}</li>
                  <li>{t('modals.donation.medicine.item5')}</li>
                </ul>
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('modals.donation.medicine.address.label')}</p>
                  <address className="text-sm bg-white/20 dark:bg-black/20 p-2 rounded-md mt-1 text-slate-900 dark:text-slate-50 not-italic whitespace-pre-wrap">
                    {t('modals.donation.medicine.address.value')}
                  </address>
                </div>
                <a
                  href="mailto:catwaala@gmail.com?subject=Medicine%20Donation%20Inquiry"
                  className="block w-full text-center bg-orange-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {t('modals.donation.medicine.button')}
                </a>
              </div>
            )}

            {activeTab === 'bank' && (
              <div role="tabpanel" aria-labelledby="bank-tab" className="space-y-3 text-center py-8">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl">
                  <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">Coming Soon 🏦</h3>
                  <p className="text-slate-700 dark:text-slate-300">
                    Our official bank account is being finalized.
                  </p>
                  <p className="text-sm mt-3 text-slate-600 dark:text-slate-400">
                    For large donations, please contact us directly via email.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;