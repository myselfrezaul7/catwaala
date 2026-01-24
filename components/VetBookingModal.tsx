import * as React from 'react';
import type { Vet } from '../types';

interface VetBookingModalProps {
  vet: Vet | null;
  isOpen: boolean;
  onClose: () => void;
}

const VetBookingModal: React.FC<VetBookingModalProps> = ({ vet, isOpen, onClose }) => {
  if (!isOpen || !vet) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Appointment request sent for ${vet.name}! You will receive a confirmation shortly.`);
    onClose();
  };

  const inputStyle = "mt-1 block w-full p-2 bg-white/20 dark:bg-black/20 border border-white/40 dark:border-white/20 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-slate-900 dark:text-slate-50";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Book Appointment</h2>
                <p className="text-slate-800 dark:text-slate-200 text-lg mt-1">with <span className="font-bold text-slate-900 dark:text-slate-50">{vet.name}</span></p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 text-4xl font-light">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                  <label htmlFor="petName" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Pet's Name</label>
                  <input type="text" id="petName" required className={inputStyle} />
              </div>
              <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Reason for Consultation</label>
                  <textarea id="reason" rows={3} required placeholder="e.g., Skin rash, unusual behavior..." className={inputStyle}></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Preferred Date</label>
                    <input type="date" id="date" required className={inputStyle} />
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Preferred Time</label>
                    <input type="time" id="time" required className={inputStyle} />
                </div>
              </div>

            <div className="pt-5 border-t border-slate-300 dark:border-slate-600 mt-2">
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="bg-slate-200/70 dark:bg-slate-600/70 text-slate-800 dark:text-slate-100 font-bold py-2 px-6 rounded-lg hover:bg-slate-300/80 dark:hover:bg-slate-500/80">
                  Cancel
                </button>
                <button type="submit" className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600">
                  Request Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VetBookingModal;