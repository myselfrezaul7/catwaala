"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
} | null;

type AuthContextType = {
    currentUser: User;
    loading: boolean;
    updateUserProfile: (name: string, photoURL?: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({ currentUser: null, loading: true, updateUserProfile: async () => { }, logout: async () => { } });

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            // Mocking a logged in user for demo purposes after 500ms
            setCurrentUser({
                uid: "123",
                email: "catlover@example.com",
                displayName: "Cat Lover",
                photoURL: null
            });
            setLoading(false);
        }, 500);
    }, []);

    const updateUserProfile = async (name: string, photoURL?: string) => {
        // Mock update
        const updatedUser = { ...currentUser!, displayName: name, photoURL: photoURL || null };
        setCurrentUser(updatedUser);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
    };

    const logout = async () => {
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        loading,
        updateUserProfile,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
