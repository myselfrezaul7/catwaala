import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, writeBatch, doc } from "firebase/firestore";
import * as dotenv from "dotenv";
import { MOCK_VET_CLINICS } from "../src/data/vets";

// Load environment variables
dotenv.config({ path: ".env.local" });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedVets() {
    console.log("🚀 Starting Vet Seeding...");

    try {
        const vetsCollection = collection(db, "vets");

        // check if data exists
        const snapshot = await getDocs(vetsCollection);
        if (!snapshot.empty) {
            console.log(`⚠️  Collection 'vets' already has ${snapshot.size} documents. Aborting to prevent duplicates.`);
            return;
        }

        const batch = writeBatch(db);
        let count = 0;

        for (const vet of MOCK_VET_CLINICS) {
            const docRef = doc(vetsCollection); // Auto-ID
            batch.set(docRef, {
                legacy_id: vet.id,
                name: vet.name,
                address: vet.address,
                phone: vet.phone,
                website: vet.website || null,
                mapUrl: vet.mapUrl,
                hours: vet.hours,
                district: vet.district,
                rating: vet.rating,
                reviewCount: vet.reviewCount,
                services: vet.services,
                created_at: new Date().toISOString()
            });
            count++;
        }

        await batch.commit();
        console.log(`✅ Successfully seeded ${count} vets to Firestore!`);

    } catch (error) {
        console.error("❌ Error seeding vets:", error);
    }
}

seedVets();
