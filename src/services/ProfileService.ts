import { db, storage } from "@/utils/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export type ProfileData = {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    phone: string | null;
    role: 'user' | 'admin';
    created_at?: string;
    updated_at?: string;
};

const COLLECTION_NAME = "users";

export const ProfileService = {
    async getProfile(userId: string): Promise<ProfileData | null> {
        try {
            const docRef = doc(db, COLLECTION_NAME, userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as ProfileData;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            return null;
        }
    },

    async updateProfile(userId: string, updates: Partial<ProfileData>): Promise<ProfileData | null> {
        try {
            const docRef = doc(db, COLLECTION_NAME, userId);

            // Allow creating if doesn't exist (set with merge)
            await setDoc(docRef, {
                ...updates,
                updated_at: new Date().toISOString()
            }, { merge: true });

            const docSnap = await getDoc(docRef);
            return { id: docSnap.id, ...docSnap.data() } as ProfileData;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },

    async uploadAvatar(file: File): Promise<string> {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const storageRef = ref(storage, `avatars/${fileName}`);

            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            console.error("Avatar upload failed:", error);
            throw error;
        }
    }
};
