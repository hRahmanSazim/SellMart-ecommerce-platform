import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCd-Q52sAXJDMZZMweP_P_c9rw2Owk7DMw",
  authDomain: "sellmart-c4770.firebaseapp.com",
  projectId: "sellmart-c4770",
  storageBucket: "sellmart-c4770.appspot.com",
  messagingSenderId: "358689505956",
  appId: "1:358689505956:web:569ec160cdf7a8a86f1c31",
  measurementId: "G-14GGMEP0PG",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
