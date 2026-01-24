import * as React from 'react';
import { useState, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { MOCK_ANIMALS } from '../constants';
import AnimalCard from '../components/AnimalCard';
import { HeartIcon, ImageIcon } from '../components/icons';
import SEO from '../components/SEO';
import DonationModal from '../components/DonationModal';

// Profile Edit Modal Component
const ProfileEditModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentPhotoURL?: string;
  onSave: (name: string, photoURL?: string) => Promise<void>;
}> = ({ isOpen, onClose, currentName, currentPhotoURL, onSave }) => {
  const [name, setName] = useState(currentName);
  const [photoURL, setPhotoURL] = useState(currentPhotoURL || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name cannot be empty');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await onSave(name.trim(), photoURL || undefined);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[2rem] shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Profile</h2>
            <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:hover:text-white text-3xl font-light">&times;</button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-100/80 dark:bg-red-900/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Photo Upload */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              {photoURL ? (
                <img src={photoURL} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white/40 dark:border-white/20 shadow-lg" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-pink-600 flex items-center justify-center border-4 border-white/40 shadow-lg">
                  <span className="text-3xl font-bold text-white">{name.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg border border-slate-200 dark:border-slate-600 hover:scale-110 transition-transform"
              >
                <ImageIcon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Click camera to change photo</p>
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="editName" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Display Name</label>
            <input
              type="text"
              id="editName"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-4 bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all text-slate-900 dark:text-white"
              placeholder="Your name"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 rounded-2xl transition-all disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const { currentUser, isAuthenticated, logout, updateUserProfile } = useAuth();
  const { favoriteIds } = useFavorites();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const favoriteAnimals = MOCK_ANIMALS.filter(animal => favoriteIds.includes(animal.id));

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProfileSave = async (name: string, photoURL?: string) => {
    await updateUserProfile(name, photoURL);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <SEO title="Dashboard" description="Manage your profile and favorites." canonical="/dashboard" />

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentName={currentUser?.name || ''}
        currentPhotoURL={currentUser?.photoURL}
        onSave={handleProfileSave}
      />

      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Profile Card */}
        <div className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[3rem] p-8 sm:p-12 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture */}
            <div className="relative group cursor-pointer" onClick={() => setIsEditModalOpen(true)}>
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt={currentUser.name} className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white/40 dark:border-white/20 shadow-xl group-hover:opacity-80 transition-opacity" />
              ) : (
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-orange-400 to-pink-600 flex items-center justify-center border-4 border-white/40 dark:border-white/20 shadow-xl group-hover:opacity-80 transition-opacity">
                  <span className="text-4xl sm:text-5xl font-bold text-white">{getInitials(currentUser?.name || 'U')}</span>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full">Edit</span>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-900"></div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">{currentUser?.name}</h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">{currentUser?.email}</p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <div className="bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">{favoriteIds.length}</span>
                  <span className="ml-2 text-slate-600 dark:text-slate-300">Favorites</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="bg-white/50 dark:bg-black/40 backdrop-blur-md border border-white/30 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold py-3 px-8 rounded-2xl transition-all hover:bg-white/70 dark:hover:bg-black/60"
                >
                  Edit Profile
                </button>
                <Link to="/adopt" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/30">
                  Find a Pet
                </Link>
                <button onClick={handleLogout} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3 px-8 rounded-2xl transition-all hover:bg-slate-300 dark:hover:bg-slate-600">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Animals Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-white/20 pb-4 flex items-center">
            <div className="bg-red-500/20 p-2 rounded-full mr-4 backdrop-blur-sm">
              <HeartIcon className="w-6 h-6 text-red-500" />
            </div>
            Your Favorite Animals
          </h2>
          {favoriteAnimals.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {favoriteAnimals.map(animal => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          ) : (
            <div className="text-center bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/10 p-12 rounded-[3rem] shadow-lg">
              <div className="text-6xl mb-4">💔</div>
              <p className="text-xl text-slate-700 dark:text-slate-300 mb-6">You haven't favorited any animals yet.</p>
              <Link to="/adopt" className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                Browse Pets
              </Link>
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pl-4 border-l-4 border-orange-500">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Adopt */}
            <Link to="/adopt" className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[2rem] p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="text-4xl mb-4">🐕</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Adopt a Pet</h3>
              <p className="text-slate-600 dark:text-slate-300">Browse our lovable animals waiting for forever homes.</p>
            </Link>

            {/* Donate */}
            <button onClick={() => setIsDonationModalOpen(true)} className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[2rem] p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group text-left">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Make a Donation</h3>
              <p className="text-slate-600 dark:text-slate-300">Support our mission by donating to help rescued animals.</p>
            </button>

            {/* Memorial */}
            <Link to="/memorial" className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[2rem] p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="text-4xl mb-4">🕊️</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Memorial Wall</h3>
              <p className="text-slate-600 dark:text-slate-300">Honor beloved pets who have crossed the rainbow bridge.</p>
            </Link>
          </div>
        </section>
      </div>
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </>
  );
};

export default DashboardPage;