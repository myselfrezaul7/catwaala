import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ArrowUpIcon } from '../components/icons';
import AnimalCard from '../components/AnimalCard';
import { MOCK_ANIMALS, MOCK_SUCCESS_STORIES } from '../constants';
import DonationModal from '../components/DonationModal';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title="Home"
        description="Catwaala - Rescue, Rehabilitate, Rehome. Join our mission to help animals in need."
        canonical="/"
      />
      <div className="w-full overflow-hidden">
        {/* Hero Section */}
        {/* Hero Section */}
        <section
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden mb-8 bg-brand-100 dark:bg-slate-900 transition-colors duration-500"
        >
          {/* Decorative blobs/circles for cartoon vibe */}
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>

          <div className="container mx-auto px-4 z-10 relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">

              {/* Text Content */}
              <div className="w-full md:w-1/2 text-center md:text-left animate-fade-in-up">
                <div className="inline-block px-4 py-1 rounded-full bg-brand-200 border border-brand-300 text-brand-800 text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-sm">
                  Rescue &middot; Rehabilitate &middot; Rehome
                </div>
                <h1 className="text-5xl sm:text-7xl font-extrabold text-brand-900 dark:text-brand-100 tracking-tight mb-6">
                  {t('homePage.hero.title')}
                </h1>
                <p className="text-lg md:text-xl text-brand-800 dark:text-brand-50 mb-8 leading-relaxed font-medium">
                  {t('homePage.hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4">
                  <Link
                    to="/adopt"
                    className="w-full sm:w-auto bg-brand-600 text-white font-bold py-4 px-8 rounded-2xl text-lg hover:bg-brand-700 transition-all transform hover:scale-105 duration-300 shadow-lg hover:shadow-brand-500/30"
                  >
                    {t('homePage.hero.meetButton')}
                  </Link>
                  <a
                    href="https://www.petbhai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-white text-brand-800 border-2 border-brand-200 font-bold py-4 px-8 rounded-2xl text-lg hover:bg-brand-50 transition-all transform hover:scale-105 duration-300"
                  >
                    {t('homePage.hero.shopButton')}
                  </a>
                </div>
              </div>

              {/* Hero Image / Brand Illustration */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="relative w-full max-w-md md:max-w-lg aspect-square">
                  <img
                    src="/logo.png"
                    alt="Catwaala Hero Illustration"
                    className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[3rem] p-10 sm:p-16 shadow-2xl text-center">
              <span className="text-orange-600 dark:text-orange-400 font-bold tracking-widest uppercase text-sm mb-4 block">Our Mission</span>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">{t('homePage.mission.title')}</h2>
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-light">
                {t('homePage.mission.text')}
              </p>
            </div>
          </div>
        </section>

        {/* Adoption Preview Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">{t('homePage.preview.title')}</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light">
                {t('homePage.preview.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {MOCK_ANIMALS.slice(0, 3).map((animal, idx) => (
                <AnimalCard key={animal.id} animal={animal} index={idx} />
              ))}
            </div>
            <div className="text-center mt-16">
              <Link
                to="/adopt"
                className="inline-flex items-center justify-center px-10 py-4 bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-full text-slate-900 dark:text-white font-bold text-lg hover:bg-white/60 dark:hover:bg-white/10 transition-all group shadow-xl hover:shadow-2xl"
              >
                {t('homePage.preview.viewAllButton')}
                <ArrowUpIcon className="w-5 h-5 ml-3 transform rotate-90 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Quiz CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-orange-400 to-pink-600 rounded-[3rem] p-12 sm:p-24 text-center shadow-2xl relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-500 border border-white/20">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-sm">{t('homePage.quiz.title')}</h2>
                <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/90 leading-relaxed mb-12 font-light">
                  {t('homePage.quiz.subtitle')}
                </p>
                <Link
                  to="/quiz"
                  className="inline-block bg-white text-orange-600 font-bold py-5 px-16 rounded-full text-xl hover:bg-slate-50 transition-all transform hover:scale-105 duration-300 shadow-xl"
                >
                  {t('homePage.quiz.startButton')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 text-center tracking-tight">{t('homePage.success.title')}</h2>
            <p className="text-xl text-center text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-20 font-light">
              {t('homePage.success.subtitle')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {MOCK_SUCCESS_STORIES.map((story, idx) => (
                <div key={story.id} className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[2rem] shadow-xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="h-64 overflow-hidden relative">
                    <img src={story.imageUrl} alt={story.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <h3 className="absolute bottom-6 left-8 text-3xl font-bold text-white">{story.name}</h3>
                  </div>
                  <div className="p-8 flex flex-col flex-grow relative">
                    <div className="absolute -top-8 right-8 w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white/20 backdrop-blur-md">
                      <HeartIcon className="w-8 h-8 fill-white" />
                    </div>
                    <blockquote className="italic text-slate-700 dark:text-slate-200 flex-grow relative pl-4 text-lg leading-relaxed font-light">
                      <span className="text-6xl text-orange-200 dark:text-orange-900 absolute -top-4 -left-2 opacity-50">"</span>
                      {story.story}
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="bg-white/30 dark:bg-black/30 backdrop-blur-3xl rounded-[3rem] border border-white/40 dark:border-white/10 p-10 lg:p-20 flex flex-col lg:flex-row items-center gap-16 shadow-2xl">
              <div className="lg:w-1/2">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 border-8 border-white/20">
                  <img src="https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Volunteer helping a dog" className="w-full h-auto object-cover" loading="lazy" />
                </div>
              </div>
              <div className="lg:w-1/2 text-center lg:text-left">
                <span className="text-orange-600 dark:text-orange-400 font-bold tracking-widest uppercase text-sm mb-4 block">Join the Team</span>
                <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">{t('homePage.volunteer.title')}</h2>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
                  {t('homePage.volunteer.subtitle')}
                </p>
                <Link
                  to="/volunteer"
                  className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-5 px-12 rounded-full text-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {t('homePage.volunteer.button')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Donate Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-5xl mx-auto p-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-[3rem] shadow-2xl">
              <div className="inline-flex justify-center items-center w-28 h-28 rounded-full bg-red-500/10 dark:bg-red-500/20 mb-10 animate-pulse-slow backdrop-blur-sm border border-red-500/20">
                <HeartIcon className="w-14 h-14 text-red-500" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">{t('homePage.donate.title')}</h2>
              <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
                {t('homePage.donate.subtitle')}
              </p>
              <button
                onClick={() => setIsDonationModalOpen(true)}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-5 px-16 rounded-full text-xl hover:shadow-lg hover:shadow-red-500/30 transition-all transform hover:scale-105 duration-300"
              >
                {t('homePage.donate.button')}
              </button>
            </div>
          </div>
        </section>
      </div>
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </>
  );
};

export default React.memo(HomePage);