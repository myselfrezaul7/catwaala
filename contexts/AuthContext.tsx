import * as React from 'react';
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName?: string, photoURL?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
  id: firebaseUser.uid,
  name: firebaseUser.displayName || 'User',
  email: firebaseUser.email || '',
  photoURL: firebaseUser.photoURL || undefined,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(mapFirebaseUser(firebaseUser));
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<void> => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }, []);

  const loginWithEmail = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Email Sign-In Error:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later.');
      }
      throw new Error('Failed to sign in. Please try again.');
    }
  }, []);

  const signupWithEmail = useCallback(async (name: string, email: string, password: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      setCurrentUser({
        id: userCredential.user.uid,
        name: name,
        email: userCredential.user.email || email,
        photoURL: undefined,
      });
    } catch (error: any) {
      console.error('Email Sign-Up Error:', error);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered. Please sign in instead.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password is too weak. Please use at least 6 characters.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      }
      throw new Error('Failed to create account. Please try again.');
    }
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<void> => {
    try {
      // Import specifically here to avoid unused import if not used elsewhere, 
      // or ensure it is imported at top.
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Reset Password Error:', error);
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email address.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      }
      throw new Error('Failed to send reset email. Please try again.');
    }
  }, []);

  const updateUserProfile = useCallback(async (displayName?: string, photoURL?: string): Promise<void> => {
    if (!auth.currentUser) {
      throw new Error('No user is signed in');
    }

    try {
      const updates: { displayName?: string; photoURL?: string } = {};
      if (displayName !== undefined) updates.displayName = displayName;
      if (photoURL !== undefined) updates.photoURL = photoURL;

      await updateProfile(auth.currentUser, updates);

      // Update local state
      setCurrentUser(prev => prev ? {
        ...prev,
        name: displayName ?? prev.name,
        photoURL: photoURL ?? prev.photoURL,
      } : null);
    } catch (error) {
      console.error('Profile Update Error:', error);
      throw new Error('Failed to update profile. Please try again.');
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout Error:', error);
      throw error;
    }
  }, []);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    resetPassword,
    updateUserProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};