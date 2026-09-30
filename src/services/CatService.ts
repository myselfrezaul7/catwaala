import { db } from "@/utils/firebase";
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { cats } from "@/data/cats";

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
                where("status", "==", "Available")
            );
            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Cat));
            return docs.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
        } catch (error) {
            console.error("Error fetching cats:", error);
            return [];
        }
    },

    async getById(id: string): Promise<Cat | null> {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as Cat;
            }
        } catch (error) {
            console.error("Error fetching cat by id from Firestore:", error);
        }

        // Fallback to starter/seed cats so Mimi, Billu, Luna, etc. never 404
        const seedCat = cats.find(c => c.id === id || c.name.toLowerCase() === id.toLowerCase());
        if (seedCat) {
            let ageInMonths = 2;
            const lowerAge = seedCat.age.toLowerCase();
            if (lowerAge.includes('week')) {
                const w = parseInt(seedCat.age);
                ageInMonths = isNaN(w) ? 1 : Math.max(1, Math.round(w / 4));
            } else if (lowerAge.includes('year')) {
                const y = parseInt(seedCat.age);
                ageInMonths = isNaN(y) ? 12 : y * 12;
            } else if (lowerAge.includes('month') || lowerAge.includes('mo')) {
                const m = parseInt(seedCat.age);
                ageInMonths = isNaN(m) ? 2 : m;
            }

            return {
                id: seedCat.id,
                name: seedCat.name,
                age: ageInMonths,
                gender: (seedCat.gender === 'Female' ? 'Female' : 'Male') as 'Male' | 'Female',
                breed: seedCat.breed || 'Rescue Cat',
                location: seedCat.location,
                description: seedCat.description,
                attributes: {
                    vaccinated: Boolean(seedCat.vaccinated),
                    neutered: Boolean(seedCat.neutered),
                    goodWithKids: Boolean(seedCat.goodWithKids),
                    houseTrained: true,
                },
                images: [seedCat.imageUrl],
                status: (seedCat.tag === 'Adopted' ? 'Adopted' : 'Available') as 'Available' | 'Adopted' | 'Pending',
                created_at: new Date().toISOString(),
            };
        }

        return null;
    },

    async getByIds(ids: string[]) {
        if (ids.length === 0) return [];
        // Firestore 'in' query supports up to 10 items. For more, we'd need to batch or parallelize.
        // For now, assuming < 10 favorites generally.
        try {
        // Actually, fetching by document ID is different.
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
