import { db, storage } from "@/utils/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Report } from "./server-data";
import { rateLimiter } from "@/lib/rate-limit";
import { ReportSchema, sanitizeInput } from "@/lib/validation";
import { ValidationError, RateLimitError, handleServiceError } from "@/lib/errors";

const COLLECTION_NAME = "reports";

export const ReportService = {
    async getByUserId(userId: string) {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("user_id", "==", userId)
            );
            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Report));
            return docs.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
        } catch (error) {
            console.error("Error fetching user reports:", error);
            return [];
        }
    },

    async create(report: Omit<Report, 'id' | 'created_at' | 'status'>) {
        // Rate limiting check (max 3 reports per 10 minutes)
        const limitKey = `report_create_${report.user_id || 'anonymous'}`;
        const rateCheck = rateLimiter.check(limitKey, 3, 10 * 60 * 1000);
        if (!rateCheck.success) {
            throw new RateLimitError("Too many reports created. Please wait before submitting another.");
        }

        // Sanitize string inputs
        const sanitized = {
            ...report,
            description: sanitizeInput(report.description || ""),
            location_text: sanitizeInput(report.location_text || ""),
            contact_info: sanitizeInput(report.contact_info || ""),
        };

        // Zod validation
        const parseResult = ReportSchema.safeParse(sanitized);
        if (!parseResult.success) {
            const firstError = parseResult.error.issues[0]?.message || "Invalid report data.";
            throw new ValidationError(firstError);
        }

        try {
            const payload = {
                ...parseResult.data,
                description: sanitizeInput(parseResult.data.description || ""),
                location_text: sanitizeInput(parseResult.data.location_text || ""),
                contact_info: sanitizeInput(parseResult.data.contact_info || ""),
                user_id: report.user_id,
                created_at: new Date().toISOString(),
                status: 'Open'
            };
            const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
            return { id: docRef.id, ...payload } as unknown as Report;
        } catch (error) {
            console.error("Error creating report:", error);
            throw new Error(handleServiceError(error));
        }
    },

    async uploadImage(file: File) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
            throw new Error("Invalid file type. Only images are allowed.");
        }

        // Validate file size (e.g., max 5MB)
        const MAX_SIZE_MB = 5;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            throw new Error(`File size exceeds ${MAX_SIZE_MB}MB limit.`);
        }

        // Validate extension
        const fileExt = file.name.split(".").pop()?.toLowerCase();
        const allowedExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
        if (!fileExt || !allowedExtensions.includes(fileExt)) {
            throw new Error("Invalid file extension.");
        }

        try {
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const storageRef = ref(storage, `report-images/${fileName}`);

            await uploadBytes(storageRef, file);
            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error("Report image upload failed:", error);
            throw error;
        }
    }
};
