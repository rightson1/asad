import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/messaging";
const api = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "turf-efcd3.firebaseapp.com",
  projectId: "turf-efcd3",
  storageBucket: "turf-efcd3.appspot.com",
  messagingSenderId: "961545898505",
  appId: "1:961545898505:web:05eab766663ae5a92a46d8",
};

export const app = initializeApp(firebaseConfig, {});

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
