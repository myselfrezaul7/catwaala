import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { Memorial } from '../types';
import { MOCK_MEMORIALS } from '../constants';
import { ImageIcon, HeartIcon } from '../components/icons';
import { useCookieConsent } from '../contexts/CookieConsentContext';

const MEMORIALS_STORAGE_KEY = 'catwaala_memorials';

const MemorialCard: React.FC<{ memorial: Memorial }> = React.memo(({ memorial }) => (
    <div className="bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden flex flex-col group h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48 sm:h-64 overflow-hidden">
            <img src={memorial.imageUrl} alt={memorial.petName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">{memorial.petName}</h3>
                <HeartIcon className="w-6 h-6 text-red-400 drop-shadow-md" />
            </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Remembered by {memorial.ownerName}</p>
            <p className="text-base text-slate-800 dark:text-slate-200 flex-grow leading-relaxed italic border-l-2 border-orange-400 pl-4">
                "{memorial.tribute}"
            </p>
        </div>
    </div>
));

const MemorialForm: React.FC<{ isVisible: boolean; onClose: () => void; onSubmit: (memorial: Memorial) => void; }> = ({ isVisible, onClose, onSubmit }) => {
    const [petName, setPetName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [tribute, setTribute] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Focus trapping and Escape key handling for accessibility
    useEffect(() => {
        if (isVisible) {
            const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (!focusableElements || focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            closeButtonRef.current?.focus();

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                    return;
                }
                if (e.key !== 'Tab') return;
                if (e.shiftKey) { // Shift+Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            };
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isVisible, onClose]);


    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (file.size > 5 * 1024 * 1024) {
                setError("Image size must be less than 5MB.");
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }

            setError(''); // Clear previous errors
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    }, []);

    const resetForm = useCallback(() => {
        setPetName('');
        setOwnerName('');
        setTribute('');
        setImage(null);
        setError('');
        setIsLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        onClose();
    }, [onClose]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!petName || !ownerName || !tribute || !image) {
            setError("Please fill all fields and upload an image.");
            return;
        }
        setIsLoading(true);
        try {
            // Simulate submission delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // "Real-time" update happens via onSubmit immediately affecting the parent list
            onSubmit({
                id: Date.now(),
                petName,
                ownerName,
                tribute,
                imageUrl: image,
                timestamp: new Date().toISOString(),
            });
            resetForm();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [petName, ownerName, tribute, image, resetForm, onSubmit]);

    if (!isVisible) return null;

    const inputStyle = "w-full p-4 bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 text-slate-900 dark:text-slate-50 placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white/60 dark:focus:bg-black/60 transition-all backdrop-blur-sm";

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex justify-center items-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="memorial-form-title">
            <div ref={modalRef} className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
                    <div className="flex justify-between items-center mb-2">
                        <h2 id="memorial-form-title" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Share a Memory</h2>
                        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close" className="text-slate-500 hover:text-slate-800 dark:hover:text-white text-4xl font-light transition-colors">&times;</button>
                    </div>
                    {error && (
                        <div className="p-4 rounded-xl bg-red-100/80 dark:bg-red-900/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 font-medium animate-pulse">
                            ⚠️ {error}
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="petName" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Pet's Name</label>
                            <input type="text" id="petName" value={petName} onChange={e => setPetName(e.target.value)} required className={inputStyle} autoComplete="off" />
                        </div>
                        <div>
                            <label htmlFor="ownerName" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Your Name</label>
                            <input type="text" id="ownerName" value={ownerName} onChange={e => setOwnerName(e.target.value)} required className={inputStyle} placeholder="e.g., The Khan Family" autoComplete="name" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="tribute" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Tribute</label>
                        <textarea id="tribute" value={tribute} onChange={e => setTribute(e.target.value)} rows={4} required placeholder="Share a few words about your beloved pet..." className={inputStyle}></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Photo of Your Pet</label>
                        {!image ? (
                            <div className="mt-2 flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-white/30 dark:border-white/10 border-dashed rounded-2xl cursor-pointer bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 transition-all group">
                                    <div className="p-4 bg-white/30 dark:bg-white/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                        <ImageIcon className="w-8 h-8 text-slate-600 dark:text-slate-300" />
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">Click to upload</p>
                                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" required />
                                </label>
                            </div>
                        ) : (
                            <div className="mt-4 relative rounded-2xl overflow-hidden shadow-lg border border-white/20">
                                <img src={image} alt="Preview" className="max-h-60 w-full object-cover" />
                                <button type="button" onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = "" }} className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg hover:bg-black/80 transition-colors">&times;</button>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end pt-4 border-t border-white/20 dark:border-white/10">
                        <button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-4 px-10 rounded-xl text-lg hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-wait">
                            {isLoading ? 'Submitting...' : 'Submit Tribute'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const MemorialPage: React.FC = () => {
    const { hasConsent } = useCookieConsent();
    const [memorials, setMemorials] = useState<Memorial[]>(() => {
        if (hasConsent('functional')) {
            try {
                const storedMemorials = window.localStorage.getItem(MEMORIALS_STORAGE_KEY);
                if (storedMemorials) {
                    return JSON.parse(storedMemorials);
                }
            } catch (error) {
                console.error("Error reading memorials from localStorage", error);
            }
        }
        return MOCK_MEMORIALS;
    });

    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        if (hasConsent('functional')) {
            try {
                window.localStorage.setItem(MEMORIALS_STORAGE_KEY, JSON.stringify(memorials));
            } catch (error) {
                console.error("Error writing memorials to localStorage", error);
            }
        }
    }, [memorials, hasConsent]);

    const handleAddMemorial = useCallback((newMemorial: Memorial) => {
        setMemorials(prev => [newMemorial, ...prev]);
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 drop-shadow-sm">The Memorial Wall</h1>
                <div className="max-w-3xl mx-auto bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-[2rem] p-8 shadow-lg">
                    <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-light">
                        A place to honor and remember the beloved animal companions who have crossed the rainbow bridge. Gone but never forgotten.
                    </p>
                </div>
            </div>

            <div className="text-center mb-16">
                <button
                    onClick={() => setIsFormVisible(true)}
                    className="bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 text-slate-900 dark:text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-white dark:hover:bg-white/20 transition-all transform hover:scale-105 duration-300 shadow-xl"
                >
                    + Add a Tribute
                </button>
            </div>

            <MemorialForm
                isVisible={isFormVisible}
                onClose={() => setIsFormVisible(false)}
                onSubmit={handleAddMemorial}
            />

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {memorials.map(memorial => (
                    <MemorialCard key={memorial.id} memorial={memorial} />
                ))}
            </div>
        </div>
    );
};

export default MemorialPage;