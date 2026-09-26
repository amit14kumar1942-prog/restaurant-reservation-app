import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { FirebaseConfig } from "../types";

const getSavedConfig = (): FirebaseConfig => {
  const local = localStorage.getItem('estate_firebase_config');
  if (local) {
    try { return JSON.parse(local); } catch (e) { console.error(e); }
  }
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKey1234567890abcdefghijklmnopqrst",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "estate-prime-reserve.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "estate-prime-reserve",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "estate-prime-reserve.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "102938475612",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:102938475612:web:a1b2c3d4e5f6g7h8i9j0"
  };
};

export const currentFirebaseConfig = getSavedConfig();

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(currentFirebaseConfig);
} else {
  app = getApp();
}

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

export const reinitializeFirebase = (newConfig: FirebaseConfig) => {
  localStorage.setItem('estate_firebase_config', JSON.stringify(newConfig));
  window.location.reload();
};
