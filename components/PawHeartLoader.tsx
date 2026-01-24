import React from 'react';
import { PawIcon, HeartIcon } from './icons';

interface PawHeartLoaderProps {
  text?: string;
  isError?: boolean;
  className?: string;
}

const PawHeartLoader: React.FC<PawHeartLoaderProps> = ({ text, isError = false, className = "" }) => {
  return (
    <div className={`flex flex-col justify-center items-center p-8 ${className}`}>
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Rotating ring */}
        <div className={`absolute inset-0 border-4 rounded-full border-dashed ${isError ? 'border-red-300 dark:border-red-900/50' : 'border-orange-200 dark:border-slate-700'} animate-[spin_10s_linear_infinite]`}></div>
        
        {/* Background Paw */}
        <div className={`absolute inset-0 flex items-center justify-center transform transition-all duration-1000 ${isError ? 'opacity-30' : 'opacity-20 animate-pulse'}`}>
             <PawIcon className={`w-24 h-24 ${isError ? 'text-slate-500' : 'text-orange-500'}`} />
        </div>

        {/* Foreground Heart */}
        <div className={`relative z-10 ${isError ? 'animate-[bounce_2s_infinite]' : 'animate-heartbeat'}`}>
             <HeartIcon className={`w-12 h-12 ${isError ? 'text-slate-400 dark:text-slate-500' : 'text-red-500 drop-shadow-xl'}`} />
             {isError && (
                 <div className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                     !
                 </div>
             )}
        </div>
        
        {/* Floating particles for loading state */}
        {!isError && (
            <>
                <div className="absolute top-2 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75" style={{ animationDuration: '2s' }}></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-75" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
            </>
        )}
      </div>
      
      <div className="mt-8 text-center max-w-sm mx-auto">
        <p className={`text-lg font-bold tracking-wider uppercase mb-2 ${isError ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400 animate-pulse'}`}>
            {isError ? 'Oops! Paw-sible Error' : (text || 'Loading...')}
        </p>
        {text && isError && (
            <p className="text-slate-600 dark:text-slate-300 font-medium text-sm">
                {text}
            </p>
        )}
        {!isError && text !== 'Loading...' && text && (
             <p className="text-slate-600 dark:text-slate-300 font-medium text-sm">
                {text}
            </p>
        )}
      </div>
    </div>
  );
};

export default PawHeartLoader;