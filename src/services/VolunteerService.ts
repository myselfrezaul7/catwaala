import { db } from "@/utils/firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { sanitizeInput } from "@/lib/validation";
import { rateLimiter } from "@/lib/rate-limit";
import { RateLimitError, ValidationError, handleServiceError } from "@/lib/errors";

const COLLECTION_NAME = "volunteers";

export type VolunteerApplicationData = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    interest: string;
    message?: string;
    status: "Pending" | "Approved" | "Rejected";
    created_at: string;
};

export const VolunteerService = {
    async create(data: {
        name: string;
        email: string;
        phone: string;
        interest: string;
        message?: string;
    }): Promise<VolunteerApplicationData> {
        // Rate limiting check (max 5 volunteer applications per 10 minutes)
        const limitKey = `volunteer_create_${(data.email || "anonymous").toLowerCase().trim()}`;
        const rateCheck = rateLimiter.check(limitKey, 5, 10 * 60 * 1000);
        if (!rateCheck.success) {
            throw new RateLimitError("Too many volunteer applications submitted. Please wait before submitting another.");
        }

        if (!data.name?.trim() || !data.email?.trim() || !data.phone?.trim()) {
            throw new ValidationError("Name, email, and phone number are required.");
        }

        const sanitized = {
            name: sanitizeInput(data.name.trim()),
            email: sanitizeInput(data.email.trim()),
            phone: sanitizeInput(data.phone.trim()),
            interest: sanitizeInput(data.interest?.trim() || "General"),
            message: data.message ? sanitizeInput(data.message.trim()) : "",
            status: "Pending" as const,
            created_at: new Date().toISOString(),
        };

        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), sanitized);
            return { id: docRef.id, ...sanitized };
        } catch (error) {
            console.error("Error creating volunteer application:", error);
            throw new Error(handleServiceError(error));
        }
    },

    async getAll(): Promise<VolunteerApplicationData[]> {
        try {
            const q = query(collection(db, COLLECTION_NAME), orderBy("created_at", "desc"));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VolunteerApplicationData));
        } catch (error) {
            console.error("Error fetching volunteers:", error);
            return [];
        }
    }
};
