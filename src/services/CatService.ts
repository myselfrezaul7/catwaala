import { db } from "@/utils/firebase";
import { collection, getDocs, doc, getDoc, query, where, orderBy, limit } from "firebase/firestore";

export type Cat = {
    id: string;
    name: string;
    age: number; // in months
    gender: 'Male' | 'Female';
    breed: string | null;
    location: string;
    description: string | null;
    attributes: {
        vaccinated: boolean;
        neutered: boolean;
        goodWithKids: boolean;
        houseTrained: boolean;
    };
    images: string[];
    status: 'Available' | 'Adopted' | 'Pending';
    created_at: string;
};

const COLLECTION_NAME = "cats";

export const CatService = {
    async getAll() {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("status", "==", "Available"),
                orderBy("created_at", "desc")
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Cat));
        } catch (error) {
            console.error("Error fetching cats:", error);
            return [];
        }
    },

    async getById(id: string) {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as Cat;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching cat by id:", error);
            return null;
        }
    },

    async getByIds(ids: string[]) {
        if (ids.length === 0) return [];
        // Firestore 'in' query supports up to 10 items. For more, we'd need to batch or parallelize.
        // For now, assuming < 10 favorites generally.
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("id", "in", ids) // Note: This assumes 'id' field exists in doc, or we use documentId()
            );
            // Actually, fetching by document ID is different.
            // Let's do parallel fetches for now as it's cleaner for random IDs
            const stats = await Promise.all(ids.map(id => this.getById(id)));
            return stats.filter(Boolean) as Cat[];
        } catch (error) {
            console.error("Error fetching cats by ids:", error);
            return [];
        }
    }
};
