import * as React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFoundPage: React.FC = () => {

    return (
        <>
            <SEO
                title="Page Not Found"
                description="The page you're looking for doesn't exist."
                canonical="/404"
            />
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="text-center max-w-lg">
                    {/* Glassy Card */}
                    <div className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/30 dark:border-white/10 rounded-[3rem] p-12 shadow-2xl">
                        {/* 404 Number */}
                        <div className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-600 mb-6 drop-shadow-sm">
                            404
                        </div>

                        {/* Emoji */}
                        <div className="text-6xl mb-6 animate-float">
                            🐕
                        </div>

                        {/* Message */}
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            Oops! Page Not Found
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
                            Looks like this page went for a walk and got lost. Let's get you back home!
                        </p>

                        {/* CTA Button */}
                        <Link
                            to="/"
                            className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-2xl text-lg transition-all transform hover:scale-105 duration-300 shadow-lg hover:shadow-orange-500/30"
                        >
                            Take Me Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
