import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/messaging";
const api = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "asad-f6a1b.firebaseapp.com",
  projectId: "asad-f6a1b",
  storageBucket: "asad-f6a1b.appspot.com",
  messagingSenderId: "1028622385237",
  appId: "1:1028622385237:web:110063287a66a8270ad4dc",
};

export const app = initializeApp(firebaseConfig, {});

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
