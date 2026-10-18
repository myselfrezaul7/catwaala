"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
    User,
    onAuthStateChanged,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { friendlyAuthMessage } from "@/utils/friendlyErrors";
import { rateLimiter } from "@/lib/rate-limit";

export type UserData = {
    email: string;
    displayName: string | null;
    full_name?: string | null;
    photoURL: string | null;
    role: string;
    createdAt: string;
    points?: number;
    phone?: string;
    id?: string;
};

type AuthContextType = {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    signInWithEmail: (email: string, pass: string) => Promise<void>;
    signUpWithEmail: (email: string, pass: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    loading: true,
    signInWithGoogle: async () => { },
    signOut: async () => { },
    signInWithEmail: async () => { },
    signUpWithEmail: async () => { },
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Handle redirect result if user was redirected for Google login
        getRedirectResult(auth).catch((e) => {
            console.error("Error processing auth redirect", e);
        });

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                try {
                    const docSnap = await getDoc(doc(db, "users", user.uid));
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        const newUser = {
                            id: user.uid,
                            full_name: user.displayName || "Cat Lover",
                            email: user.email,
                            role: 'user',
                            points: 0,
                            avatar_url: user.photoURL || null,
                            created_at: new Date().toISOString()
                        };
                        await setDoc(doc(db, "users", user.uid), newUser);
                        setUserData(newUser);
                    }
                } catch (e) {
                    console.error("Error fetching user data", e);
                }
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            await signInWithPopup(auth, provider);
        } catch (error: any) {
            if (error?.code === 'auth/popup-blocked') {
                // Fall back to redirect on mobile or strict popup blockers
                await signInWithRedirect(auth, provider);
                return;
            }
            console.error("Error signing in with Google", error);
            throw error;
        }
    };

    const signInWithEmail = async (email: string, pass: string) => {
        const limitKey = `auth_login_${(email || "").toLowerCase().trim()}`;

        if (rateLimiter.isLocked(limitKey)) {
            const lockoutMsg = "Too many failed login attempts. Please wait 1 minute before trying again.";
            toast.error(lockoutMsg);
            const err: any = new Error(lockoutMsg);
            err.code = "auth/too-many-requests";
            err.customHandled = true;
            throw err;
        }

        try {
            await signInWithEmailAndPassword(auth, email, pass);
            rateLimiter.reset(limitKey);
        } catch (error: any) {
            console.error("Error signing in with email", error);
            const isLocked = rateLimiter.recordFailure(limitKey, 5, 5 * 60 * 1000, 60 * 1000);
            if (isLocked) {
                toast.error("Too many failed login attempts. Please wait 1 minute before trying again.");
            }
            throw error;
        }
    };

    const signUpWithEmail = async (email: string, pass: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, pass);
        } catch (error: any) {
            console.error("Error signing up", error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            setUser(null);
            router.refresh();
            router.push("/");
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    const value = {
        user,
        userData,
        loading,
        signInWithGoogle,
        signOut,
        signInWithEmail,
        signUpWithEmail,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
