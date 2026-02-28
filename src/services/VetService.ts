import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { MOCK_VET_CLINICS } from "@/data/vets";

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
            const snapshot = await getDocs(collection(db, COLLECTION_NAME));
            if (!snapshot.empty) {
                const rawVets = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as VetClinic[];

                // Deduplicate actively based on physical name and phone to prevent seed bloat
                return rawVets.filter((vet, index, self) =>
                    index === self.findIndex((t) => t.name === vet.name && t.phone === vet.phone)
                );
            }
        } catch (error) {
            console.error("Firebase fetch failed, using fallback mock vets.", error);
        }

        // Fallback
        return MOCK_VET_CLINICS.map(vet => ({
            ...vet,
            id: vet.id.toString(),
            legacy_id: vet.id
        })) as VetClinic[];
    },

    async getByDistrict(district: string) {
        const all = await this.getAll();
        return all.filter(v => v.district === district);
    }
};
