import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA66yeeb21kzl84v1C_7cVlO2WG3zHFiWY",
    authDomain: "catwaal-animal-welfare.firebaseapp.com",
    projectId: "catwaal-animal-welfare",
    storageBucket: "catwaal-animal-welfare.firebasestorage.app",
    messagingSenderId: "758797390593",
    appId: "1:758797390593:web:798fdadbeced5e2490c100",
    measurementId: "G-WBTHC18V1L"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics;
// Initialize Analytics only on the client side
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, db, storage, analytics };
