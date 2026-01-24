import React, { useCallback, useState } from 'react';
import Alert from './Alert';
import { useLanguage } from '../contexts/LanguageContext';
import { XIcon } from './icons';

interface VolunteerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VolunteerFormModal: React.FC<VolunteerFormModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const motivation = formData.get('motivation') as string;
    
    const availability = formData.getAll('availability').join(', ');
    const interests = formData.getAll('interest').join(', ');

    const subject = `Volunteer Application: ${name}`;
    const body = `Name: ${name}
Email: ${email}
Phone: ${phone}

Availability: ${availability}
Interests: ${interests}

Motivation:
${motivation}`;

    const mailtoLink = `mailto:catwaala@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Redirect to mailto link to open email client
    window.location.href = mailtoLink;

    setIsSubmitting(false);
    setIsSuccess(true);
  }, []);
  
  if (!isOpen) return null;

  const inputStyles = "mt-1 block w-full p-3 bg-white/40 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-500 backdrop-blur-sm transition-all";
  const labelStyles = "block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 mb-1";
  const checkboxLabelStyles = "flex items-center text-slate-700 dark:text-slate-300 bg-white/30 dark:bg-black/20 p-3 rounded-lg border border-white/20 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/10 transition-colors cursor-pointer";
  const checkboxInputStyles = "mr-3 h-5 w-5 text-orange-600 focus:ring-orange-500 border-slate-400 rounded accent-orange-500";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-0 sm:p-4 transition-all duration-300" onClick={onClose}>
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/40 dark:border-white/10 w-full h-full sm:rounded-[2rem] shadow-2xl sm:max-w-3xl sm:max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        {isSuccess ? (
          <div className="p-12 text-center flex flex-col justify-center items-center h-full">
            <div>
                <Alert type="success" title={t('volunteerForm.success.title')} message={t('volunteerForm.success.message')} className="shadow-xl" />
                <button onClick={onClose} className="mt-8 bg-orange-500 text-white font-bold py-3 px-10 rounded-full hover:bg-orange-600 shadow-lg hover:shadow-orange-500/40 transition-all">
                    {t('buttons.close')}
                </button>
            </div>
          </div>
        ) : (
          <div className="p-8 md:p-10">
            <div className="flex justify-between items-start mb-8 sticky top-0 bg-transparent z-10">
              <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100">{t('volunteerForm.title')}</h2>
                  <p className="text-slate-600 dark:text-slate-300 text-lg mt-2 font-light">{t('volunteerForm.subtitle')}</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                  <XIcon className="w-8 h-8" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <fieldset className="bg-white/20 dark:bg-black/10 p-6 rounded-2xl border border-white/20 dark:border-white/5">
                  <legend className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 px-2">{t('volunteerForm.yourInfo.title')}</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                          <label htmlFor="volunteerName" className={labelStyles}>{t('volunteerForm.yourInfo.name')} <span className="text-red-500">*</span></label>
                          <input type="text" id="volunteerName" name="name" required className={inputStyles} />
                      </div>
                      <div>
                          <label htmlFor="volunteerEmail" className={labelStyles}>{t('volunteerForm.yourInfo.email')} <span className="text-red-500">*</span></label>
                          <input type="email" id="volunteerEmail" name="email" required className={inputStyles} />
                      </div>
                  </div>
                  <div className="mt-5">
                      <label htmlFor="volunteerPhone" className={labelStyles}>{t('volunteerForm.yourInfo.phone')} <span className="text-red-500">*</span></label>
                      <input type="tel" id="volunteerPhone" name="phone" pattern="(\+8801|01)[3-9]\d{8}" placeholder="+8801..." required className={inputStyles} />
                  </div>
              </fieldset>

              {/* Availability & Interests */}
              <fieldset className="bg-white/20 dark:bg-black/10 p-6 rounded-2xl border border-white/20 dark:border-white/5">
                  <legend className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 px-2">{t('volunteerForm.availability.title')}</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                          <label className={labelStyles}>{t('volunteerForm.availability.label')}</label>
                          <div className="mt-3 space-y-3">
                              <label className={checkboxLabelStyles}><input type="checkbox" name="availability" value="weekdays" className={checkboxInputStyles}/> {t('volunteerForm.availability.weekdays')}</label>
                              <label className={checkboxLabelStyles}><input type="checkbox" name="availability" value="weekends" className={checkboxInputStyles}/> {t('volunteerForm.availability.weekends')}</label>
                              <label className={checkboxLabelStyles}><input type="checkbox" name="availability" value="evenings" className={checkboxInputStyles}/> {t('volunteerForm.availability.evenings')}</label>
                          </div>
                      </div>
                      <div>
                          <label className={labelStyles}>{t('volunteerForm.interests.label')}</label>
                          <div className="mt-3 space-y-3">
                              <label className={checkboxLabelStyles}><input type="checkbox" name="interest" value="animal-care" className={checkboxInputStyles}/> {t('volunteerForm.interests.animalCare')}</label>
                              <label className={checkboxLabelStyles}><input type="checkbox" name="interest" value="events" className={checkboxInputStyles}/> {t('volunteerForm.interests.events')}</label>
                              <label className={checkboxLabelStyles}><input type="checkbox" name="interest" value="fundraising" className={checkboxInputStyles}/> {t('volunteerForm.interests.fundraising')}</label>
                              <label className={checkboxLabelStyles}><input type="checkbox" name="interest" value="admin" className={checkboxInputStyles}/> {t('volunteerForm.interests.admin')}</label>
                          </div>
                      </div>
                  </div>
              </fieldset>
              
              {/* Motivation */}
              <fieldset className="bg-white/20 dark:bg-black/10 p-6 rounded-2xl border border-white/20 dark:border-white/5">
                  <legend className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 px-2">{t('volunteerForm.motivation.title')}</legend>
                  <div>
                      <label htmlFor="motivation" className={labelStyles}>{t('volunteerForm.motivation.label')} <span className="text-red-500">*</span></label>
                      <textarea id="motivation" name="motivation" rows={4} required placeholder={t('volunteerForm.motivation.placeholder')} className={inputStyles}></textarea>
                  </div>
              </fieldset>

              <div className="pt-6 border-t border-slate-200/50 dark:border-white/10 flex justify-end gap-4">
                  <button type="button" onClick={onClose} className="bg-white/40 dark:bg-white/10 text-slate-700 dark:text-slate-200 font-bold py-3 px-8 rounded-full hover:bg-white/60 dark:hover:bg-white/20 backdrop-blur-md transition-all">
                    {t('buttons.cancel')}
                  </button>
                  <button type="submit" disabled={isSubmitting} className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 shadow-lg hover:shadow-orange-500/40 disabled:bg-orange-300 disabled:cursor-not-allowed transition-all transform hover:scale-105">
                    {isSubmitting ? t('buttons.submitting') : t('buttons.submitApplication')}
                  </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerFormModal;