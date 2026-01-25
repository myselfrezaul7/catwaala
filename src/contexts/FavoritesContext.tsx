"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type FavoritesContextType = {
    favoriteIds: string[];
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("catwaala_favorites");
        if (stored) {
            setFavoriteIds(JSON.parse(stored));
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("catwaala_favorites", JSON.stringify(favoriteIds));
    }, [favoriteIds]);

    const toggleFavorite = (id: string) => {
        setFavoriteIds(prev =>
            prev.includes(id)
                ? prev.filter(fid => fid !== id)
                : [...prev, id]
        );
    };

    const isFavorite = (id: string) => {
        return favoriteIds.includes(id);
    };

    const value = {
        favoriteIds,
        toggleFavorite,
        isFavorite
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}
