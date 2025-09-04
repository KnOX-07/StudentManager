import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD0pHrmUW4kclIRydCPurHC-AfDr5ooSvQ",
    authDomain: "fir-app-5bfb9.firebaseapp.com",
    projectId: "fir-app-5bfb9",
    storageBucket: "fir-app-5bfb9.firebasestorage.app",
    messagingSenderId: "952994635766",
    appId: "1:952994635766:web:f4c6e9bde4330127e031d7",
    measurementId: "G-ZJZRRBTMLM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);