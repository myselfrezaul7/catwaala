import { db, storage } from "@/utils/firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Memorial } from "./server-data";

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
                where("user_id", "==", userId),
                orderBy("created_at", "desc")
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Memorial));
        } catch (error) {
            console.error("Error fetching user memorials:", error);
            return [];
        }
    },

    async create(memorial: any) {
        try {
            const memorialWithStatus = {
                ...memorial,
                status: "Pending", // New memorials require admin moderation
                created_at: new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, COLLECTION_NAME), memorialWithStatus);
            return { id: docRef.id, ...memorialWithStatus };
        } catch (error) {
            console.error("Error creating memorial:", error);
            throw error;
        }
    },

    async uploadImage(file: File) {
        try {
            const fileExt = file.name.split(".").pop();
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
