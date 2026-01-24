
import React, { memo } from 'react';
import type { LocalVet } from '../types';
import { MapPinIcon, PhoneIcon } from './icons';

interface LocalVetCardProps {
  vet: LocalVet;
}

const LocalVetCard: React.FC<LocalVetCardProps> = ({ vet }) => {
  return (
    <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-lg border border-white/40 dark:border-slate-700/50 rounded-2xl shadow-sm hover:shadow-xl p-3 sm:p-6 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] active:scale-[0.98] group h-full">
      <div>
        <h3 className="text-sm sm:text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors mb-2 sm:mb-4 line-clamp-2">{vet.name}</h3>
        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex-shrink-0 mt-0.5">
                <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">{vet.address}</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-green-50 dark:bg-green-900/20 rounded-lg flex-shrink-0">
                <PhoneIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
            </div>
            <a href={`tel:${vet.phone}`} className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400 hover:underline decoration-2 underline-offset-4 transition-colors">{vet.phone}</a>
          </div>
        </div>
      </div>
      <div className="mt-4 sm:mt-8 pt-3 sm:pt-6 border-t border-slate-100 dark:border-slate-700/50">
        <a 
          href={vet.googleMapsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-transparent border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md text-xs sm:text-base"
        >
          <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Location</span>
        </a>
      </div>
    </div>
  );
};

export default memo(LocalVetCard);
