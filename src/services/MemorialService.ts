import { db, storage } from "@/utils/firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Memorial } from "./server-data";
import { rateLimiter } from "@/lib/rate-limit";
import { MemorialSchema, sanitizeInput } from "@/lib/validation";
import { ValidationError, RateLimitError, handleServiceError } from "@/lib/errors";

const COLLECTION_NAME = "memorials";

export const MemorialService = {
    async getAll() {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                orderBy("created_at", "desc")
            );
            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Memorial));
            // Return only approved memorials, or legacy ones that don't have a status field yet
            return docs.filter(m => !m.status || m.status === 'Approved');
        } catch (error) {
            console.error("Error fetching memorials:", error);
            return [];
        }
    },

    async getByUserId(userId: string) {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("user_id", "==", userId)
            );
            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Memorial));
            return docs.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
        } catch (error) {
            console.error("Error fetching user memorials:", error);
            return [];
        }
    },

    async create(memorial: Omit<Memorial, 'id' | 'created_at' | 'status'>) {
        // Rate limit check (5 submissions per 15 min)
        const limitKey = `memorial_create_${memorial.user_id || 'anonymous'}`;
        const rateCheck = rateLimiter.check(limitKey, 5, 15 * 60 * 1000);
        if (!rateCheck.success) {
            throw new RateLimitError("Too many memorial submissions. Please wait before submitting another.");
        }

        // Sanitize string inputs
        const sanitized = {
            ...memorial,
            pet_name: sanitizeInput(memorial.pet_name || ""),
            owner_name: sanitizeInput(memorial.owner_name || ""),
            tribute: sanitizeInput(memorial.tribute || ""),
        };

        // Zod validation
        const parseResult = MemorialSchema.safeParse(sanitized);
        if (!parseResult.success) {
            const firstError = parseResult.error.issues[0]?.message || "Invalid memorial data.";
            throw new ValidationError(firstError);
        }

        try {
            const memorialWithStatus = {
                ...parseResult.data,
                pet_name: sanitizeInput(parseResult.data.pet_name || ""),
                owner_name: sanitizeInput(parseResult.data.owner_name || ""),
                tribute: sanitizeInput(parseResult.data.tribute || ""),
                user_id: memorial.user_id,
                status: "Pending", // New memorials require admin moderation
                created_at: new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, COLLECTION_NAME), memorialWithStatus);
            return { id: docRef.id, ...memorialWithStatus } as unknown as Memorial;
        } catch (error) {
            console.error("Error creating memorial:", error);
            throw new Error(handleServiceError(error));
        }
    },

    async uploadImage(file: File) {
        if (!file.type.startsWith("image/")) {
            throw new Error("Invalid file type. Only images are allowed.");
        }

        const MAX_SIZE_MB = 5;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            throw new Error(`File size exceeds ${MAX_SIZE_MB}MB limit.`);
        }

        const fileExt = file.name.split(".").pop()?.toLowerCase();
        const allowedExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
        if (!fileExt || !allowedExtensions.includes(fileExt)) {
            throw new Error("Invalid file extension.");
        }

        try {
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const storageRef = ref(storage, `memorial-images/${fileName}`);

            await uploadBytes(storageRef, file);
            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error("Memorial image upload failed:", error);
            throw error;
        }
    }
};
