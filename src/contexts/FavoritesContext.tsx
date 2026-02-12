"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/utils/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";

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
    const { user } = useAuth();

    // Real-time sync with Firestore
    useEffect(() => {
        let unsubscribe: () => void;

        async function setupFavorites() {
            if (user) {
                const docRef = doc(db, "users", user.uid);

                // Set up listener
                unsubscribe = onSnapshot(docRef, async (docSnap) => {
                    if (docSnap.exists() && docSnap.data().favorites) {
                        const dbFavorites = docSnap.data().favorites || [];
                        setFavoriteIds(dbFavorites);

                        // Check for local favorites to merge (one-time check usually, but good to keep logic safe)
                        const localStored = localStorage.getItem("catwaala_favorites");
                        if (localStored) {
                            const localFavorites = JSON.parse(localStored);
                            const combined = Array.from(new Set([...dbFavorites, ...localFavorites]));
                            if (combined.length > dbFavorites.length) {
                                await updateDoc(docRef, { favorites: combined });
                                localStorage.removeItem("catwaala_favorites");
                            }
                        }
                    } else {
                        // Initialize if empty but local storage has data
                        const localStored = localStorage.getItem("catwaala_favorites");
                        if (localStored) {
                            const localFavorites = JSON.parse(localStored);
                            await setDoc(docRef, { favorites: localFavorites }, { merge: true });
                            localStorage.removeItem("catwaala_favorites");
                        }
                    }
                }, (error) => {
                    console.error("Error listening to favorites:", error);
                });

            } else {
                // Load from local storage for guests
                const stored = localStorage.getItem("catwaala_favorites");
                if (stored) {
                    setFavoriteIds(JSON.parse(stored));
                }
            }
        }

        setupFavorites();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [user]);

    // Save favorites
    const toggleFavorite = async (id: string) => {
        const isCurrentlyFavorite = favoriteIds.includes(id);
        const newFavorites = isCurrentlyFavorite
            ? favoriteIds.filter(fid => fid !== id)
            : [...favoriteIds, id];

        // Optimistic update
        setFavoriteIds(newFavorites);

        // Persist
        if (user) {
            const docRef = doc(db, "users", user.uid);
            try {
                await setDoc(docRef, {
                    favorites: isCurrentlyFavorite ? arrayRemove(id) : arrayUnion(id)
                }, { merge: true });
            } catch (error) {
                console.error("Error updating favorites:", error);
                // Listener will revert if write fails
            }
        } else {
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
