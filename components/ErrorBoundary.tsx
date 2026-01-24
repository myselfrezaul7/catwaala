import * as React from 'react';
import { en, bn } from '../i18n/translations';
import PawHeartLoader from './PawHeartLoader';

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

const translations = { en, bn };

class ErrorBoundary extends React.Component<Props, State> {
  // Explicitly declare props to satisfy strict TypeScript checks
  public readonly props: Readonly<Props>;

  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Simple language detection fallback
      const lang = (typeof document !== 'undefined' && document.documentElement.lang === 'bn') ? 'bn' : 'en';
      const t = (key: keyof typeof en): string => {
        const dict = (translations[lang] || translations['en']) as Record<string, string>;
        const fallback = translations['en'] as Record<string, string>;
        // Cast key to string to allow indexing
        return dict[key as string] || fallback[key as string] || key as string;
      };
      
      return (
        <div className="container mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-[60vh]">
          <PawHeartLoader isError={true} text={t('errorBoundary.title')} />
          <p className="text-lg text-slate-800 dark:text-slate-200 mt-4 text-center max-w-md">
            {t('errorBoundary.subtitle')}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-500/30"
          >
            {t('errorBoundary.button')}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;