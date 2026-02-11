import { db, storage } from "@/utils/firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Report } from "./server-data";

const COLLECTION_NAME = "reports";

export const ReportService = {
    async getByUserId(userId: string) {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("user_id", "==", userId),
                orderBy("created_at", "desc")
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Report));
        } catch (error) {
            console.error("Error fetching user reports:", error);
            return [];
        }
    },

    async create(report: any) { // using 'any' loosely here to avoid strict type mismatch with Supabase types during transition
        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                ...report,
                created_at: new Date().toISOString(),
                status: 'Open'
            });
            return { id: docRef.id, ...report };
        } catch (error) {
            console.error("Error creating report:", error);
            throw error;
        }
    },

    async uploadImage(file: File) {
        try {
            const fileExt = file.name.split(".").pop();
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
