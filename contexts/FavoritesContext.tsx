import * as React from 'react';
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useCookieConsent } from './CookieConsentContext';

const FAVORITES_STORAGE_KEY = 'catwaala_favorites';

interface FavoritesContextType {
  favoriteIds: number[];
  toggleFavorite: (animalId: number) => void;
  isFavorite: (animalId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hasConsent } = useCookieConsent();
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  // Effect to load/clear favorites based on cookie consent.
  useEffect(() => {
    if (hasConsent('functional')) {
      try {
        const favorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (favorites) {
          const parsed = JSON.parse(favorites);
          if (Array.isArray(parsed)) {
            setFavoriteIds(parsed);
          } else {
            setFavoriteIds([]);
          }
        } else {
          setFavoriteIds([]);
        }
      } catch (error) {
        console.error("Error reading favorites from localStorage", error);
        // Fallback to empty to prevent crash
        setFavoriteIds([]);
        // Optional: clear corrupted storage
        try { window.localStorage.removeItem(FAVORITES_STORAGE_KEY); } catch (e) { }
      }
    } else {
      setFavoriteIds([]);
    }
  }, [hasConsent]);

  // Effect to save favorites to storage when they change (if consent is given).
  useEffect(() => {
    if (hasConsent('functional')) {
      try {
        window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
      } catch (error) {
        console.error("Error writing favorites to localStorage", error);
      }
    } else {
      // Ensure storage is cleared if consent is revoked or not for functional cookies.
      try {
        window.localStorage.removeItem(FAVORITES_STORAGE_KEY);
      } catch (e) {
        console.error("Error removing favorites from localStorage", e);
      }
    }
  }, [favoriteIds, hasConsent]);

  const toggleFavorite = useCallback((animalId: number) => {
    setFavoriteIds(prevIds => {
      if (prevIds.includes(animalId)) {
        return prevIds.filter(id => id !== animalId);
      } else {
        return [...prevIds, animalId];
      }
    });
  }, []);

  const isFavorite = useCallback((animalId: number) => {
    return favoriteIds.includes(animalId);
  }, [favoriteIds]);

  const value = {
    favoriteIds,
    toggleFavorite,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};