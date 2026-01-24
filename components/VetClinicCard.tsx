import * as React from 'react';
import type { VetClinic } from '../types';
import { MapPinIcon, PhoneIcon, GlobeIcon } from './icons';

interface VetClinicCardProps {
  clinic: VetClinic;
}

const VetClinicCard: React.FC<VetClinicCardProps> = ({ clinic }) => {
  return (
    <div className="bg-white/30 dark:bg-black/30 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-lg flex flex-col p-6 sm:p-8 transition-all duration-300 ease-out hover:shadow-2xl hover:bg-white/40 dark:hover:bg-white/5 hover:-translate-y-1 group h-full">
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">{clinic.name}</h3>
        <div className="bg-white/40 dark:bg-white/10 p-2 rounded-xl flex-shrink-0 backdrop-blur-sm border border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-500"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
        </div>
      </div>

      <p className="text-slate-700 dark:text-slate-300 mt-4 flex-grow text-sm sm:text-base leading-relaxed opacity-90 line-clamp-3">
        {clinic.address}
      </p>

      <div className="mt-6 border-t border-white/20 dark:border-white/10 pt-4 space-y-3 text-slate-800 dark:text-slate-200">
        <p className="flex items-center text-sm font-medium">
          <PhoneIcon className="w-4 h-4 mr-3 text-slate-500 dark:text-slate-400 flex-shrink-0" />
          <span className="truncate">{clinic.phone}</span>
        </p>
        <p className="flex items-center text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-3 text-slate-500 dark:text-slate-400 flex-shrink-0"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
          <span className="truncate">{clinic.hours}</span>
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a
          href={`tel:${clinic.phone}`}
          className="flex items-center justify-center bg-orange-500 text-white font-bold py-2.5 px-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 text-xs sm:text-sm"
        >
          <PhoneIcon className="w-3.5 h-3.5 mr-2" /> Call
        </a>
        {clinic.website && (
          <a
            href={clinic.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-white/40 dark:bg-white/10 text-slate-900 dark:text-white font-bold py-2.5 px-3 rounded-xl hover:bg-white/60 dark:hover:bg-white/20 transition-all shadow-sm text-xs sm:text-sm border border-white/20"
          >
            <GlobeIcon className="w-3.5 h-3.5 mr-2" /> Web
          </a>
        )}
        <a
          href={clinic.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center bg-white/40 dark:bg-white/10 text-slate-900 dark:text-white font-bold py-2.5 px-3 rounded-xl hover:bg-white/60 dark:hover:bg-white/20 transition-all shadow-sm text-xs sm:text-sm border border-white/20 ${!clinic.website ? 'sm:col-span-2' : ''}`}
        >
          <MapPinIcon className="w-3.5 h-3.5 mr-2" /> Map
        </a>
      </div>
    </div>
  );
};

export default React.memo(VetClinicCard);