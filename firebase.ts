import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

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
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only if supported)
isSupported().then((supported) => {
    if (supported) {
        getAnalytics(app);
    }
});

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
