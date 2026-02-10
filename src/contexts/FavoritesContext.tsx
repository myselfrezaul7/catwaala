"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabaseClient } from "@/utils/supabase/client";

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
    const { user } = useAuth(); // Assume we have access to user from AuthContext

    // Load favorites
    useEffect(() => {
        async function loadFavorites() {
            if (user) {
                // Load from DB
                const { data, error } = await supabaseClient
                    .from('favorites')
                    .select('cat_id')
                    .eq('user_id', user.id);

                if (data && !error) {
                    // Start with DB favorites
                    const dbFavorites = data.map(f => f.cat_id.toString());

                    // Merge with local storage (if any pending from guest session)
                    const localStored = localStorage.getItem("catwaala_favorites");
                    if (localStored) {
                        const localFavorites = JSON.parse(localStored);
                        // Combine unique
                        const combined = Array.from(new Set([...dbFavorites, ...localFavorites]));
                        setFavoriteIds(combined);

                        // Clear local storage to avoid confusion, or keep it as cache?
                        // Let's keep it as is, but maybe we should sync ONLY to DB if logged in.
                    } else {
                        setFavoriteIds(dbFavorites);
                    }
                }
            } else {
                // Load from local storage
                const stored = localStorage.getItem("catwaala_favorites");
                if (stored) {
                    setFavoriteIds(JSON.parse(stored));
                }
            }
        }
        loadFavorites();
    }, [user]);

    // Save favorites
    const toggleFavorite = async (id: string) => {
        const isCurrentlyFavorite = favoriteIds.includes(id);
        const newFavorites = isCurrentlyFavorite
            ? favoriteIds.filter(fid => fid !== id)
            : [...favoriteIds, id];

        setFavoriteIds(newFavorites);

        // Persist
        if (user) {
            // Update DB
            const catId = parseInt(id);
            if (isCurrentlyFavorite) {
                // Remove
                await supabaseClient
                    .from('favorites')
                    .delete()
                    .match({ user_id: user.id, cat_id: catId });
            } else {
                // Add
                await supabaseClient
                    .from('favorites')
                    .insert({ user_id: user.id, cat_id: catId });
            }
        } else {
            // Update local storage
            localStorage.setItem("catwaala_favorites", JSON.stringify(newFavorites));
        }
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
