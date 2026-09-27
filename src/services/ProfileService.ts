import { db, storage } from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ProfileUpdateSchema, sanitizeInput } from "@/lib/validation";
import { ValidationError, handleServiceError } from "@/lib/errors";

export type ProfileData = {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    phone: string | null;
    role: 'user' | 'admin';
    created_at?: string;
    updated_at?: string;
    points?: number;
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
        // Strip sensitive fields to prevent privilege escalation or data tampering
        const { role, points, created_at, ...safeUpdates } = updates as any;

        const sanitized = {
            ...safeUpdates,
            full_name: safeUpdates.full_name ? sanitizeInput(safeUpdates.full_name) : undefined,
            phone: safeUpdates.phone ? sanitizeInput(safeUpdates.phone) : undefined,
        };

        const parseResult = ProfileUpdateSchema.safeParse(sanitized);
        if (!parseResult.success) {
            const firstError = parseResult.error.issues[0]?.message || "Invalid profile data.";
            throw new ValidationError(firstError);
        }

        try {
            const docRef = doc(db, COLLECTION_NAME, userId);

            await setDoc(docRef, {
                ...parseResult.data,
                updated_at: new Date().toISOString()
            }, { merge: true });

            const docSnap = await getDoc(docRef);
            return { id: docSnap.id, ...docSnap.data() } as ProfileData;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw new Error(handleServiceError(error));
        }
    },

    async uploadAvatar(userId: string, file: File): Promise<string> {
        if (!file.type.startsWith("image/")) {
            throw new Error("Invalid file type. Only images are allowed for avatars.");
        }

        const MAX_SIZE_MB = 5;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            throw new Error(`Avatar image size exceeds ${MAX_SIZE_MB}MB limit.`);
        }

        const fileExt = file.name.split('.').pop()?.toLowerCase();
        const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
        if (!fileExt || !allowedExtensions.includes(fileExt)) {
            throw new Error("Invalid file extension for avatar.");
        }

        try {
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const storageRef = ref(storage, `avatars/${userId}/${fileName}`);

            await uploadBytes(storageRef, file);
            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error("Avatar upload failed:", error);
            throw error;
        }
    }
};
