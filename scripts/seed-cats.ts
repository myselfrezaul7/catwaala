
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, writeBatch, doc } from "firebase/firestore";
import * as dotenv from "dotenv";
import { cats } from "../src/data/cats";

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

async function seedCats() {
    console.log("🚀 Starting Cat Seeding...");

    try {
        const catsCollection = collection(db, "cats");

        // check if data exists
        const snapshot = await getDocs(catsCollection);
        if (!snapshot.empty) {
            console.log(`⚠️  Collection 'cats' already has ${snapshot.size} documents. Aborting to prevent duplicates.`);
            return;
        }

        const batch = writeBatch(db);
        let count = 0;

        for (const cat of cats) {
            const docRef = doc(catsCollection); // Auto-ID
            batch.set(docRef, {
                ...cat,
                status: 'Available', // Default status
                created_at: new Date().toISOString()
            });
            count++;
        }

        if (count > 0) {
            await batch.commit();
        }

        console.log(`✅ Successfully seeded ${count} cats to Firestore!`);

    } catch (error) {
        console.error("❌ Error seeding cats:", error);
    }
}

seedCats();
