import * as React from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_ANIMALS } from '../constants';
import AdoptionForm from '../components/AdoptionForm';
import { HeartIcon } from '../components/icons';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

const AnimalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const animal = MOCK_ANIMALS.find(a => a.id === Number(id));
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);

  if (!animal) {
    return (
      <div className="text-center py-20">
        <SEO title="Animal Not Found" description="The requested animal could not be found." />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Animal not found!</h1>
        <p className="text-slate-800 dark:text-slate-200 mt-4">The animal you are looking for might have been adopted or the link is incorrect.</p>
        <Link to="/adopt" className="mt-8 inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-colors">
          Back to Adoption Page
        </Link>
      </div>
    );
  }

  const isCurrentlyFavorite = isFavorite(animal.id);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      alert("Please log in to save your favorites!");
      return;
    }
    toggleFavorite(animal.id);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300); // Duration of the pop animation
  };

  return (
    <>
      <SEO
        title={`Adopt ${animal.name} - ${animal.breed}`}
        description={`Meet ${animal.name}, a ${animal.age} old ${animal.breed} looking for a home.`}
        image={animal.imageUrl}
        canonical={`/adopt/${animal.id}`}
      />
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden md:flex">
          <div className="md:w-1/2 relative">
            <img src={animal.imageUrl} alt={animal.name} className="w-full h-full object-cover min-h-[300px]" loading="lazy" />
            {isAuthenticated && (
              <button
                onClick={handleFavoriteClick}
                className={`absolute top-4 right-4 p-3 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm transition-colors duration-300 ${isAnimating ? 'animate-pop' : ''}`}
                aria-label={isCurrentlyFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <HeartIcon className={`w-7 h-7 ${isCurrentlyFavorite ? 'text-red-500' : 'text-white/80'}`} />
              </button>
            )}
          </div>
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50">{animal.name}</h1>
              <p className="text-xl text-slate-800 dark:text-slate-200 font-semibold mt-2">{animal.breed}</p>
              <div className="mt-4 text-lg text-slate-700 dark:text-slate-300 flex items-center space-x-4">
                <span>{animal.age} old</span>
                <span className="text-slate-400 dark:text-slate-600">&bull;</span>
                <span>{animal.gender}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {animal.temperamentTags?.map(tag => (
                  <span key={tag} className="bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 text-sm font-semibold px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-slate-800 dark:text-slate-200 mt-6 leading-relaxed text-lg">{animal.description}</p>
            </div>
            <div className="mt-8">
              <button
                onClick={() => setIsFormOpen(true)}
                className="w-full bg-orange-500 text-white font-bold py-4 px-6 rounded-lg text-xl hover:bg-orange-600 transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <HeartIcon className="w-6 h-6" />
                <span>Apply to Adopt {animal.name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <AdoptionForm
        animal={animal}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  );
};

export default AnimalDetailPage;