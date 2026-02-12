import { db } from "@/utils/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export type VetClinic = {
    id: string; // Firestore ID
    legacy_id?: number; // From mock data
    name: string;
    address: string;
    phone: string;
    website?: string;
    mapUrl: string;
    hours: string;
    district: string;
    rating: number;
    reviewCount: number;
    services: string[];
};

const COLLECTION_NAME = "vets";

export const VetService = {
    async getAll() {
        try {
            const q = query(collection(db, COLLECTION_NAME), orderBy("district"));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VetClinic));
        } catch (error) {
            console.error("Error fetching vets:", error);
            return [];
        }
    },

    async getByDistrict(district: string) {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("district", "==", district)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VetClinic));
        } catch (error) {
            console.error("Error fetching vets by district:", error);
            return [];
        }
    }
};
