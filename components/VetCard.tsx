import * as React from 'react';
import type { Vet } from '../types';
import { VideoCameraIcon } from './icons';

interface VetCardProps {
  vet: Vet;
  onBookAppointment: (vet: Vet) => void;
}

const VetCard: React.FC<VetCardProps> = ({ vet, onBookAppointment }) => {
  return (
    <div className="bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-3xl shadow-lg flex flex-col text-center items-center p-8 transform hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out h-full">
      <div className="relative mb-6">
        <div className="p-1 rounded-full border-2 border-white/50 dark:border-white/20 shadow-inner">
            <img className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover" src={vet.imageUrl} alt={`Dr. ${vet.name}`} />
        </div>
        <span className={`absolute bottom-2 right-2 block h-5 w-5 rounded-full ${vet.isOnline ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'bg-slate-400'} ring-4 ring-white/40 dark:ring-black/40 backdrop-blur-sm`}></span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-2">{vet.name}</h3>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium flex-grow">{vet.specialization}</p>
      <p className={`mt-4 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/30 dark:bg-black/30 ${vet.isOnline ? 'text-green-700 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>
        {vet.isOnline ? 'Available Now' : 'Offline'}
      </p>
      <button 
        onClick={() => onBookAppointment(vet)}
        disabled={!vet.isOnline}
        className="mt-6 w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 px-6 rounded-2xl flex items-center justify-center space-x-2 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm transform active:scale-95"
      >
        <VideoCameraIcon className="w-5 h-5" />
        <span>Book Session</span>
      </button>
    </div>
  );
};

export default VetCard;