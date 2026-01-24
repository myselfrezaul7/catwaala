import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import type { Animal } from '../types';
import FormError from './FormError';
import { useLanguage } from '../contexts/LanguageContext';

interface AdoptionFormProps {
  animal: Animal;
  isOpen: boolean;
  onClose: () => void;
}

const AdoptionForm: React.FC<AdoptionFormProps> = ({ animal, isOpen, onClose }) => {
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasOtherPets, setHasOtherPets] = useState(''); // 'yes' or 'no'

  // Focus trapping and Escape key handling for accessibility
  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Focus the first element (the close button) when the modal opens
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // In a real application, you would send this data to your backend API
      // which would then email catwaala@gmail.com

      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (Math.random() > 0.9) { // Reduced failure rate
        throw new Error(t('modals.adoptionForm.submit.error'));
      }

      // Explicitly mention the email as requested
      const successMsg = t('modals.adoptionForm.submit.success', { animalName: animal.name }) +
        "\nA copy has been sent to catwaala@gmail.com for review.";

      alert(successMsg);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('generic.error.default'));
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = "mt-1 block w-full p-2 bg-white/50 dark:bg-slate-900/50 border border-white/30 dark:border-slate-700 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500/80 focus:border-orange-500 text-slate-900 dark:text-slate-50";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="adoption-form-title">
      <div ref={modalRef} className="bg-white/40 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/20 dark:border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 id="adoption-form-title" className="text-3xl font-bold text-slate-900 dark:text-slate-50">{t('modals.adoptionForm.title')}</h2>
              <p className="text-slate-800 dark:text-slate-200 text-lg mt-1">{t('modals.adoptionForm.subtitle', { animalName: '' })} <span className="font-bold text-slate-900 dark:text-slate-50">{animal.name}</span></p>
            </div>
            <button ref={closeButtonRef} onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-4xl font-light">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <fieldset className="border-t border-slate-300 dark:border-slate-600 pt-5">
              <legend className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">{t('modals.adoptionForm.yourInfo')}</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-200">{t('modals.adoptionForm.fullName')}</label>
                  <input type="text" id="fullName" required className={inputStyle} autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-200">{t('modals.adoptionForm.phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    pattern="(\+8801|01)[3-9]\d{8}"
                    placeholder={t('modals.adoptionForm.phone.placeholder')}
                    required
                    className={inputStyle}
                    autoComplete="tel"
                    onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity(t('modals.adoptionForm.phone.invalid'))}
                    onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">{t('modals.adoptionForm.email')}</label>
                <input type="email" id="email" required className={inputStyle} autoComplete="email" />
              </div>
              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-200">{t('modals.adoptionForm.address')}</label>
                <textarea id="address" rows={3} required className={inputStyle} autoComplete="street-address"></textarea>
              </div>
            </fieldset>

            <fieldset className="border-t border-slate-300 dark:border-slate-600 pt-5">
              <legend className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">{t('modals.adoptionForm.livingSituation')}</legend>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">{t('modals.adoptionForm.residence.label')}</label>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                  <label className="flex items-center"><input type="radio" name="residence" value="apartment" required className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500" /> {t('modals.adoptionForm.residence.apartment')}</label>
                  <label className="flex items-center"><input type="radio" name="residence" value="house" className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500" /> {t('modals.adoptionForm.residence.house')}</label>
                  <label className="flex items-center"><input type="radio" name="residence" value="other" className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500" /> {t('modals.adoptionForm.residence.other')}</label>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">{t('modals.adoptionForm.ownRent.label')}</label>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                  <label className="flex items-center"><input type="radio" name="ownRent" value="own" required className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500" /> {t('modals.adoptionForm.ownRent.own')}</label>
                  <label className="flex items-center"><input type="radio" name="ownRent" value="rent" className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500" /> {t('modals.adoptionForm.ownRent.rent')}</label>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{t('modals.adoptionForm.ownRent.permission')}</p>
              <div className="mt-4">
                <label htmlFor="livingSituation" className="block text-sm font-medium text-slate-700 dark:text-slate-200">{t('modals.adoptionForm.livingDesc.label')}</label>
                <textarea id="livingSituation" rows={3} required placeholder={t('modals.adoptionForm.livingDesc.placeholder')} className={inputStyle}></textarea>
              </div>
            </fieldset>

            <fieldset className="border-t border-slate-300 dark:border-slate-600 pt-5">
              <legend className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">{t('modals.adoptionForm.petExperience')}</legend>
              <div className="mt-4">
                <label htmlFor="hoursAlone" className="block text-sm font-medium text-slate-700 dark:text-slate-200">{t('modals.adoptionForm.hoursAlone.label')}</label>
                <select id="hoursAlone" required className={inputStyle}>
                  <option value="">{t('modals.adoptionForm.hoursAlone.select')}</option>
                  <option value="0-2">{t('modals.adoptionForm.hoursAlone.option1')}</option>
                  <option value="2-4">{t('modals.adoptionForm.hoursAlone.option2')}</option>
                  <option value="4-6">{t('modals.adoptionForm.hoursAlone.option3')}</option>
                  <option value="6-8">{t('modals.adoptionForm.hoursAlone.option4')}</option>
                  <option value="8+">{t('modals.adoptionForm.hoursAlone.option5')}</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">{t('modals.adoptionForm.otherPets.label')}</label>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="otherPets" value="yes" required className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500" onChange={(e) => setHasOtherPets(e.target.value)} /> {t('modals.adoptionForm.otherPets.yes')}
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="otherPets" value="no" className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500" onChange={(e) => setHasOtherPets(e.target.value)} /> {t('modals.adoptionForm.otherPets.no')}
                  </label>
                </div>
              </div>
              {hasOtherPets === 'yes' && (
                <div className="mt-4 animate-fadeIn">
                  <label htmlFor="otherPetsDetails" className="block text-sm font-medium text-slate-700 dark:text-slate-200">{t('modals.adoptionForm.otherPetsDetails.label')}</label>
                  <textarea id="otherPetsDetails" rows={3} required placeholder={t('modals.adoptionForm.otherPetsDetails.placeholder')} className={inputStyle}></textarea>
                </div>
              )}
              <div className="mt-4">
                <label htmlFor="experience" className="block text-sm font-medium text-slate-700 dark:text-slate-200">{t('modals.adoptionForm.experience.label')}</label>
                <textarea id="experience" rows={4} required placeholder={t('modals.adoptionForm.experience.placeholder')} className={inputStyle}></textarea>
              </div>
            </fieldset>

            <FormError message={error} />

            <div className="pt-5 border-t border-slate-300 dark:border-slate-600">
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="bg-slate-200/70 dark:bg-slate-600/70 text-slate-800 dark:text-slate-100 font-bold py-2 px-6 rounded-lg hover:bg-slate-300/80 dark:hover:bg-slate-500/80">
                  {t('buttons.cancel')}
                </button>
                <button type="submit" disabled={isLoading} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-wait">
                  {isLoading ? t('modals.adoptionForm.submit.loading') : t('modals.adoptionForm.submit.button')}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;