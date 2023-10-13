// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd-Q52sAXJDMZZMweP_P_c9rw2Owk7DMw",
  authDomain: "sellmart-c4770.firebaseapp.com",
  projectId: "sellmart-c4770",
  storageBucket: "sellmart-c4770.appspot.com",
  messagingSenderId: "358689505956",
  appId: "1:358689505956:web:569ec160cdf7a8a86f1c31",
  measurementId: "G-14GGMEP0PG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
