import React, { Component, Suspense, lazy, useEffect, type ErrorInfo, type ReactNode } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import CookieConsentBanner from './components/CookieConsentBanner';
import ScrollToTopButton from './components/ScrollToTopButton';
import PawHeartLoader from './components/PawHeartLoader';

// Lazy-loaded pages for code-splitting and faster initial loads
const HomePage = lazy(() => import('./pages/HomePage'));
const AdoptPage = lazy(() => import('./pages/AdoptPage'));
const AnimalDetailPage = lazy(() => import('./pages/AnimalDetailPage'));
const PerfectMatchQuizPage = lazy(() => import('./pages/PerfectMatchQuizPage'));
const ReportPage = lazy(() => import('./pages/ReportPage'));
const OnlineVetPage = lazy(() => import('./pages/OnlineVetPage'));
const OurImpactPage = lazy(() => import('./pages/OurImpactPage'));
const AIAssistantPage = lazy(() => import('./pages/AIAssistantPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const HappyTailsPage = lazy(() => import('./pages/HappyTailsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));


// Component for suspense fallback during lazy loading
const PageLoader: React.FC = () => (
  <div className="flex-grow flex items-center justify-center p-8 min-h-[50vh]">
    <PawHeartLoader text="Fetching Happiness..." subText="Getting things ready for you and the purrfect friends." />
  </div>
);

// Error Boundary Component to catch rendering errors and prevent app crash
interface ErrorBoundaryProps {
  children?: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-grow flex flex-col items-center justify-center py-12">
            <PawHeartLoader 
                isError={true} 
                text="Oops! Something went wrong." 
                subText="We're sorry for the inconvenience. Please try refreshing the page."
                onRetry={() => window.location.reload()}
                retryText="Refresh Page"
            />
        </div>
      );
    }
    return this.props.children;
  }
}

// Automatically scrolls to top when the route path changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-transparent text-slate-800 dark:text-slate-200">
            <ScrollToTop />
            <Header />
            <main className="flex-grow flex flex-col animate-[fadeIn_0.5s_ease-in-out]">
                <ErrorBoundary>
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/adopt" element={<AdoptPage />} />
                            <Route path="/adopt/:id" element={<AnimalDetailPage />} />
                            <Route path="/perfect-match" element={<PerfectMatchQuizPage />} />
                            <Route path="/report" element={<ReportPage />} />
                            <Route path="/online-vet" element={<OnlineVetPage />} />
                            <Route path="/our-impact" element={<OurImpactPage />} />
                            <Route path="/ai-vet" element={<AIAssistantPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/happy-tails" element={<HappyTailsPage />} />
                            <Route path="/faq" element={<FAQPage />} />
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
            </main>
            <Footer />
            <ScrollToTopButton />
            <CookieConsentBanner />
        </div>
    );
}


function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <HashRouter>
            <AppContent />
          </HashRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;