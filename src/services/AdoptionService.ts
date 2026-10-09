import { db } from "@/utils/firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { sanitizeInput } from "@/lib/validation";
import { rateLimiter } from "@/lib/rate-limit";
import { RateLimitError, ValidationError, handleServiceError } from "@/lib/errors";

const COLLECTION_NAME = "adoptions";

export type AdoptionApplicationData = {
    id?: string;
    catId?: string;
    dogName?: string;
    catName: string;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    status: "Pending" | "Approved" | "Rejected";
    created_at: number;
    experience: string;
    userId?: string | null;
};

export const AdoptionService = {
    async create(data: {
        catId?: string;
        catName: string;
        applicantName: string;
        applicantEmail?: string;
        applicantPhone: string;
        experience?: string;
        userId?: string | null;
    }): Promise<AdoptionApplicationData> {
        // Rate limiting check (max 5 adoption applications per 10 minutes)
        const limitKey = `adoption_create_${(data.applicantEmail || data.applicantPhone || "anonymous").toLowerCase().trim()}`;
        const rateCheck = rateLimiter.check(limitKey, 5, 10 * 60 * 1000);
        if (!rateCheck.success) {
            throw new RateLimitError("Too many adoption applications submitted. Please wait before submitting another.");
        }

        if (!data.applicantName?.trim() || !data.applicantPhone?.trim()) {
            throw new ValidationError("Applicant name and phone number are required.");
        }

        const sanitized = {
            catId: sanitizeInput(data.catId || ""),
            dogName: sanitizeInput(data.catName), // Compatibility alias
            catName: sanitizeInput(data.catName),
            applicantName: sanitizeInput(data.applicantName.trim()),
            applicantEmail: data.applicantEmail ? sanitizeInput(data.applicantEmail.trim()) : "",
            applicantPhone: sanitizeInput(data.applicantPhone.trim()),
            status: "Pending" as const,
            created_at: Date.now(),
            experience: data.experience ? sanitizeInput(data.experience.trim()) : "",
            userId: data.userId || null,
        };

        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), sanitized);
            return { id: docRef.id, ...sanitized };
        } catch (error) {
            console.error("Error creating adoption application:", error);
            throw new Error(handleServiceError(error));
        }
    },

    async getAll(): Promise<AdoptionApplicationData[]> {
        try {
            const q = query(collection(db, COLLECTION_NAME), orderBy("created_at", "desc"));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AdoptionApplicationData));
        } catch (error) {
            console.error("Error fetching adoptions:", error);
            return [];
        }
    }
};
