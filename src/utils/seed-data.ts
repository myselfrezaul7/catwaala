import { db } from "@/utils/firebase";
import { collection, addDoc, getDocs, query, limit } from "firebase/firestore";
import { MOCK_VET_CLINICS } from "@/data/vets";

// Initial Cat Data suited for Bangladesh context
const INITIAL_CATS = [
    {
        name: "Minu",
        age: 8, // months
        gender: "Female",
        breed: "Deshi (Mixed)",
        location: "Dhanmondi, Dhaka",
        description: "Minu was found near Dhanmondi lake. She is very playful and loves fish. Fully vaccinated.",
        attributes: { vaccinated: true, neutered: true, goodWithKids: true, houseTrained: true },
        images: ["https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1887&auto=format&fit=crop"],
        status: "Available",
        created_at: new Date().toISOString()
    },
    {
        name: "Baghira",
        age: 24, // 2 years
        gender: "Male",
        breed: "Bombay Mix",
        location: "Gulshan 1, Dhaka",
        description: "A calm and majestic black cat. Loves to sit by the window. Needs a quiet home.",
        attributes: { vaccinated: true, neutered: true, goodWithKids: false, houseTrained: true },
        images: ["https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2030&auto=format&fit=crop"],
        status: "Available",
        created_at: new Date().toISOString()
    },
    {
        name: "Snowy",
        age: 3, // months
        gender: "Female",
        breed: "Persian Mix",
        location: "Uttara, Dhaka",
        description: "Rescued from a breeder. Tiny kitten needing lots of love and care.",
        attributes: { vaccinated: false, neutered: false, goodWithKids: true, houseTrained: false },
        images: ["https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop"],
        status: "Available",
        created_at: new Date().toISOString()
    },
    {
        name: "Ginger",
        age: 36, // 3 years
        gender: "Male",
        breed: "Orange Tabby",
        location: "Mirpur DOHS",
        description: "The friendliest orange tabby you'll meet. Loves belly rubs.",
        attributes: { vaccinated: true, neutered: true, goodWithKids: true, houseTrained: true },
        images: ["https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2080&auto=format&fit=crop"],
        status: "Available",
        created_at: new Date().toISOString()
    },
    {
        name: "Luna",
        age: 12, // 1 year
        gender: "Female",
        breed: "Calico",
        location: "Bashundhara R/A",
        description: "Shy at first but very affectionate once she knows you.",
        attributes: { vaccinated: true, neutered: true, goodWithKids: false, houseTrained: true },
        images: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop"],
        status: "Available",
        created_at: new Date().toISOString()
    }
];

export const seedData = async () => {
    try {
        // Check if cats already exist to prevent duplicate seeding
        const q = query(collection(db, "cats"), limit(1));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log("Seeding Cats...");
            for (const cat of INITIAL_CATS) {
                await addDoc(collection(db, "cats"), cat);
            }
            console.log("Cats seeded successfully!");
        } else {
            console.log("Cats collection already has data. Skipping seed.");
        }

        // Check if vets already exist
        const vq = query(collection(db, "vets"), limit(1));
        const vSnapshot = await getDocs(vq);

        if (vSnapshot.empty) {
            console.log("Seeding Vets...");
            for (const vet of MOCK_VET_CLINICS) {
                // Ensure vet matches generic Vet type structure roughly if needed, 
                // or just store as is since Firestore is schemaless
                await addDoc(collection(db, "vets"), {
                    ...vet,
                    created_at: new Date().toISOString()
                });
            }
            console.log("Vets seeded successfully!");
        } else {
            console.log("Vets collection already has data. Skipping seed.");
        }

        return "Seeding process completed.";
    } catch (error) {
        console.error("Error seeding data:", error);
        throw error;
    }
};
