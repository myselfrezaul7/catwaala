import * as React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AnimalCard from '../components/AnimalCard';
import { MOCK_ANIMALS } from '../constants';

const AdoptPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <SEO
        title="Adopt a Pet"
        description="Find your new best friend. Browse our list of lovable animals waiting for a forever home."
        canonical="/adopt"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-900 dark:text-slate-50 mb-4">Find Your New Best Friend</h1>
      <p className="text-lg text-center text-slate-800 dark:text-slate-200 max-w-3xl mx-auto mb-12">
        These wonderful animals are waiting for a loving family to call their own. Click on a pet's profile to learn more about them and to start the adoption process.
      </p>

      <div className="bg-orange-500/10 dark:bg-orange-900/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 mb-16 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">Can't Decide?</h2>
        <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 max-w-2xl mx-auto mb-6">
          Take our quick personality quiz to find the pet that best matches your lifestyle!
        </p>
        <Link to="/quiz" className="inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all transform hover:scale-105 duration-300 shadow-lg">
          Find My Match
        </Link>
      </div>

      {/* Rehoming Section */}
      <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-slate-700 rounded-2xl p-6 sm:p-8 mb-16 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">Need to Rehome Your Pet?</h2>
        <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 max-w-2xl mx-auto mb-6">
          If you need to find a loving new home for your pet, we're here to help. Please email us high-quality, clear pictures (no videos please) and a detailed description of your pet including their name, breed, age, temperament, and any medical history. Our team will review your submission and, if approved, feature them on our adoption page.
        </p>
        <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200">
          Email your submission to: <a href="mailto:catwaala@gmail.com" className="font-semibold text-orange-600 dark:text-orange-400 hover:underline">catwaala@gmail.com</a>
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-10">
        {MOCK_ANIMALS.map(animal => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
};

export default AdoptPage;