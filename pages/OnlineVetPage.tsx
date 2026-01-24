import * as React from 'react';
import { useState } from 'react';
import { MOCK_VETS } from '../constants';
import type { Vet } from '../types';
import VetCard from '../components/VetCard';
import VetBookingModal from '../components/VetBookingModal';

const OnlineVetPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVet, setSelectedVet] = useState<Vet | null>(null);

  const handleOpenModal = (vet: Vet) => {
    setSelectedVet(vet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVet(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 drop-shadow-sm">Consult a Veterinarian Online</h1>
            <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-3xl p-8 shadow-lg">
                <p className="text-lg md:text-xl text-slate-800 dark:text-slate-200 leading-relaxed font-light">
                Get professional advice for non-emergency situations from the comfort of your home. Our licensed veterinarians are here to help you with your pet's health concerns.
                </p>
            </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {MOCK_VETS.map(vet => (
            <VetCard key={vet.id} vet={vet} onBookAppointment={handleOpenModal} />
          ))}
        </div>
      </div>
      <VetBookingModal 
        vet={selectedVet}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default OnlineVetPage;