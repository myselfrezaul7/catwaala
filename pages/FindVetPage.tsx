import * as React from 'react';
import { useState, useMemo } from 'react';
import { MOCK_VET_CLINICS, BANGLADESH_DISTRICTS } from '../constants';
import VetClinicCard from '../components/VetClinicCard';
import { useLanguage } from '../contexts/LanguageContext';

const FindVetPage: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const { t } = useLanguage();

  const filteredClinics = useMemo(() => {
    if (!selectedDistrict) {
      return [];
    }
    return MOCK_VET_CLINICS.filter(
      clinic => clinic.district === selectedDistrict
    );
  }, [selectedDistrict]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 py-16 min-h-screen">
        <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight drop-shadow-sm mb-6">
                {t('findVetPage.title')}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light leading-relaxed bg-white/30 dark:bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                {t('findVetPage.subtitle')}
            </p>
        </div>

        {/* District Selector - Glass Style */}
        <div className="max-w-xl mx-auto mb-16 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-2 border border-white/50 dark:border-white/10 shadow-2xl">
                  <select
                    id="district-select"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full p-5 bg-transparent text-slate-900 dark:text-slate-50 text-xl font-medium outline-none cursor-pointer appearance-none"
                    aria-label={t('findVetPage.select.label')}
                  >
                    <option value="" className="bg-slate-100 dark:bg-slate-800 text-slate-500">{t('findVetPage.select.placeholder')}</option>
                    {BANGLADESH_DISTRICTS.sort().map(district => (
                      <option key={district} value={district} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                         {t(`districts.${district}` as any, { defaultValue: district })}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-500 dark:text-slate-400 bg-white/20 dark:bg-white/5 p-2 rounded-full backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                  </div>
              </div>
          </div>
        </div>

        {/* Conditional Rendering */}
        {selectedDistrict ? (
            filteredClinics.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {filteredClinics.map(clinic => (
                    <VetClinicCard key={clinic.id} clinic={clinic} />
                ))}
                </div>
            ) : (
                <div className="text-center bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/30 dark:border-white/10 p-12 rounded-[3rem] shadow-xl max-w-2xl mx-auto animate-pop">
                    <div className="w-24 h-24 bg-white/30 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{t('findVetPage.results.none.title')}</h3>
                    <p className="text-slate-700 dark:text-slate-300 mt-4 text-lg">
                        {t('findVetPage.results.none.subtitle', { district: t(`districts.${selectedDistrict}` as any, { defaultValue: selectedDistrict }) })}
                    </p>
                </div>
            )
        ) : (
            <div className="text-center bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-white/10 p-16 rounded-[3rem] shadow-lg max-w-3xl mx-auto mt-12">
                <div className="opacity-40 mb-8">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 mx-auto text-slate-500 dark:text-slate-400"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-3">{t('findVetPage.results.placeholder')}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Our database covers most major districts in Bangladesh.</p>
            </div>
        )}

        <div className="mt-24 text-center max-w-4xl mx-auto opacity-60 hover:opacity-100 transition-opacity">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium bg-white/20 dark:bg-black/20 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
               {t('findVetPage.disclaimer.text')}
            </p>
        </div>
      </div>
    </>
  );
};

export default FindVetPage;