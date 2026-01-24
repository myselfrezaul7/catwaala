import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_ANIMALS, MOCK_VET_CLINICS } from '../constants';
import type { Animal, VetClinic } from '../types';
import { SearchIcon, MapPinIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mapping for Bangla keywords to English terms used in MOCK_ANIMALS
const keywordMap: Record<string, string[]> = {
  'কুকুর': ['dog', 'puppy', 'retriever', 'shepherd', 'beagle', 'labrador'],
  'কুকুড়': ['dog', 'puppy', 'retriever', 'shepherd', 'beagle', 'labrador'],
  'বিড়াল': ['cat', 'kitten', 'shorthair', 'siamese'],
  'বিড়াল': ['cat', 'kitten', 'shorthair', 'siamese'],
  'বেড়াল': ['cat', 'kitten', 'shorthair', 'siamese'],
  'পাখি': ['bird', 'parrot'],
  'ডাক্তার': ['vet', 'hospital', 'clinic'],
  'চিকিৎসা': ['vet', 'hospital', 'clinic'],
  'ক্লিনিক': ['clinic'],
  // Common names transliterated
  'বাডি': ['buddy'],
  'লুসি': ['lucy'],
  'ম্যাক্স': ['max'],
  'ডেইজি': ['daisy'],
  'রকি': ['rocky'],
  'মিস্টি': ['misty'],
  // Breeds
  'গোল্ডেন': ['golden'],
  'জার্মান': ['german'],
  'শেফার্ড': ['shepherd'],
  'ল্যাবরাডর': ['labrador'],
  'সিয়ামিজ': ['siamese']
};

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animalResults, setAnimalResults] = useState<Animal[]>([]);
  const [vetResults, setVetResults] = useState<VetClinic[]>([]);
  const [statusMessage, setStatusMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setAnimalResults([]);
      setVetResults([]);
      setStatusMessage('');
      return;
    }

    const searchLower = searchTerm.toLowerCase().trim();

    // Build a list of search terms. Start with what the user typed.
    let searchTerms = [searchLower];

    // If the input matches any Bangla keywords, add the corresponding English terms to the search.
    Object.keys(keywordMap).forEach(key => {
      if (searchLower.includes(key)) {
        searchTerms = [...searchTerms, ...keywordMap[key]];
      }
    });

    // Filter animals
    const filteredAnimals = MOCK_ANIMALS.filter(animal => {
      const combinedText = `${animal.name} ${animal.breed} ${animal.description} ${animal.temperamentTags?.join(' ')}`.toLowerCase();
      return searchTerms.some(term => combinedText.includes(term));
    });

    // Filter vets
    const filteredVets = MOCK_VET_CLINICS.filter(vet => {
      const combinedText = `${vet.name} ${vet.address} ${vet.district}`.toLowerCase();
      return searchTerms.some(term => combinedText.includes(term));
    });

    setAnimalResults(filteredAnimals);
    setVetResults(filteredVets);

    const totalCount = filteredAnimals.length + filteredVets.length;

    if (totalCount > 0) {
      const key = totalCount === 1 ? 'modals.search.resultFound' : 'modals.search.resultsFound';
      setStatusMessage(t(key, { count: totalCount }));
    } else {
      setStatusMessage(t('modals.search.noResults', { term: searchTerm }));
    }
  }, [searchTerm, t]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSearchTerm('');
        setAnimalResults([]);
        setVetResults([]);
        setStatusMessage('');
      }, 300); // Allow for closing animation
    } else {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);


  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-center items-start pt-[12vh] p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
        className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border border-white/20 dark:border-slate-700 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col transition-all duration-300 transform ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="search-modal-title" className="sr-only">{t('modals.search.title')}</h2>

        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50">
          <SearchIcon className="w-6 h-6 text-orange-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('modals.search.placeholder')}
            aria-label="Search"
            className="w-full bg-transparent text-xl font-medium text-slate-900 dark:text-slate-100 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="sr-only" aria-live="polite" role="status">
          {statusMessage}
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto max-h-[60vh] min-h-[300px]">

          {/* Default Start Screen */}
          {!searchTerm.trim() && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 p-10 opacity-60">
              <SearchIcon className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">{t('modals.search.initial')}</p>
            </div>
          )}

          {/* No Results */}
          {searchTerm.trim() && animalResults.length === 0 && vetResults.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🤔</span>
              </div>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">{t('modals.search.noResults', { term: searchTerm })}</p>
              <p className="text-slate-500 dark:text-slate-400">{t('modals.search.noResults.suggestion')}</p>
            </div>
          )}

          {/* Results List */}
          {searchTerm.trim() && (animalResults.length > 0 || vetResults.length > 0) && (
            <div>
              {animalResults.length > 0 && (
                <div className="p-2">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-2 mt-2">
                    {t('nav.adopt')} ({animalResults.length})
                  </h3>
                  <ul className="space-y-1">
                    {animalResults.map(animal => (
                      <li key={animal.id}>
                        <Link
                          to={`/adopt/${animal.id}`}
                          onClick={onClose}
                          className="flex items-center p-3 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 group transition-all duration-200"
                        >
                          <img src={animal.imageUrl} alt={animal.name} className="w-14 h-14 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200 mr-4" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                              {animal.name}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                              {animal.breed} • {animal.age}
                            </p>
                          </div>
                          <span className="text-slate-300 group-hover:text-orange-400 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {vetResults.length > 0 && (
                <div className="p-2 border-t border-slate-100 dark:border-slate-700/50">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-2 mt-2">
                    {t('nav.findVet')} ({vetResults.length})
                  </h3>
                  <ul className="space-y-1">
                    {vetResults.map(vet => (
                      <li key={vet.id}>
                        <a
                          href={vet.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onClose}
                          className="flex items-center p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 group transition-all duration-200"
                        >
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform flex-shrink-0">
                            <MapPinIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {vet.name}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                              {vet.district} • {vet.phone}
                            </p>
                          </div>
                          <span className="text-slate-300 group-hover:text-blue-400 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 px-6">
          <span>Press <kbd className="font-sans bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-1.5 py-0.5 text-[10px] mx-1">ESC</kbd> to close</span>
          <span>Catwaala Search</span>
        </div>

      </div>
    </div>
  );
};

export default SearchModal;