import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { CookieConsentProvider } from './contexts/CookieConsentContext';
import { LanguageProvider } from './contexts/LanguageContext';
import CookieConsentBanner from './components/CookieConsentBanner';
import { ArrowUpIcon } from './components/icons';
import ErrorBoundary from './components/ErrorBoundary';
import PawHeartLoader from './components/PawHeartLoader';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage'));
const AdoptPage = lazy(() => import('./pages/AdoptPage'));
const ReportPage = lazy(() => import('./pages/ReportPage'));
const AnimalDetailPage = lazy(() => import('./pages/AnimalDetailPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const FindVetPage = lazy(() => import('./pages/FindVetPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const VolunteerPage = lazy(() => import('./pages/VolunteerPage'));
const MemorialPage = lazy(() => import('./pages/MemorialPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// ScrollToTop component handles resetting window scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [showScroll, setShowScroll] = useState(false);

  // Performance Optimization: Throttle scroll event for Show Scroll button
  useEffect(() => {
    let ticking = false;

    const checkScrollTop = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.pageYOffset > 400) {
            setShowScroll(true);
          } else {
            setShowScroll(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', checkScrollTop, { passive: true });
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <HelmetProvider>
      <CookieConsentProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <FavoritesProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <ErrorBoundary>
                    <div className="min-h-screen flex flex-col text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden relative">
                      <Header />
                      <main className="flex-grow pt-24 sm:pt-28">
                        <Suspense fallback={
                          <div className="flex items-center justify-center min-h-[60vh]">
                            <PawHeartLoader text="Loading CATWAALA..." />
                          </div>
                        }>
                          <div className="animate-fade-in">
                            <Routes>
                              <Route path="/" element={<HomePage />} />
                              <Route path="/adopt" element={<AdoptPage />} />
                              <Route path="/adopt/:id" element={<AnimalDetailPage />} />
                              <Route path="/report" element={<ReportPage />} />
                              <Route path="/find-vet" element={<FindVetPage />} />
                              <Route path="/login" element={<LoginPage />} />
                              <Route path="/signup" element={<SignUpPage />} />
                              <Route path="/faq" element={<FAQPage />} />
                              <Route path="/quiz" element={<QuizPage />} />
                              <Route path="/volunteer" element={<VolunteerPage />} />
                              <Route path="/memorial" element={<ProtectedRoute><MemorialPage /></ProtectedRoute>} />
                              <Route path="/dashboard" element={<DashboardPage />} />
                              <Route path="/community" element={<CommunityPage />} />
                              <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                          </div>
                        </Suspense>
                      </main>
                      <Footer />
                      <CookieConsentBanner />
                      {showScroll && (
                        <button
                          onClick={scrollTop}
                          className="fixed bottom-8 right-8 bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-white/30 dark:border-white/10 text-slate-700 dark:text-slate-200 p-4 rounded-2xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300 z-30 hover:scale-110"
                          aria-label="Scroll to top"
                        >
                          <ArrowUpIcon className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </ErrorBoundary>
                </BrowserRouter>
              </FavoritesProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </CookieConsentProvider>
    </HelmetProvider>
  );
}

export default App;