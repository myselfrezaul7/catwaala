import * as React from 'react';
import { useState, useEffect } from 'react';
import { ArrowUpIcon } from './icons';

const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
            aria-label="Back to top"
        >
            <ArrowUpIcon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
        </button>
    );
};

export default BackToTop;
