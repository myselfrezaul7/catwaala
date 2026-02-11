"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/utils/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

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

    // Load favorites
    useEffect(() => {
        async function loadFavorites() {
            if (user) {
                // Load from Firestore
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists() && docSnap.data().favorites) {
                        const dbFavorites = docSnap.data().favorites || [];
                        setFavoriteIds(dbFavorites);

                        // Sync local storage if any (optional, keeping simple for now)
                        const localStored = localStorage.getItem("catwaala_favorites");
                        if (localStored) {
                            const localFavorites = JSON.parse(localStored);
                            const combined = Array.from(new Set([...dbFavorites, ...localFavorites]));
                            if (combined.length > dbFavorites.length) {
                                // Update DB with merged
                                await updateDoc(docRef, { favorites: combined });
                                setFavoriteIds(combined);
                                localStorage.removeItem("catwaala_favorites");
                            }
                        }
                    } else {
                        // Initialize if empty but local storage has data
                        const localStored = localStorage.getItem("catwaala_favorites");
                        if (localStored) {
                            const localFavorites = JSON.parse(localStored);
                            await setDoc(docRef, { favorites: localFavorites }, { merge: true });
                            setFavoriteIds(localFavorites);
                            localStorage.removeItem("catwaala_favorites");
                        }
                    }
                } catch (error) {
                    console.error("Error loading favorites from Firestore:", error);
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
            const docRef = doc(db, "users", user.uid);
            try {
                await setDoc(docRef, {
                    favorites: isCurrentlyFavorite ? arrayRemove(id) : arrayUnion(id)
                }, { merge: true });
            } catch (error) {
                console.error("Error updating favorites:", error);
                // Revert state on error? For now, let's just log.
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
