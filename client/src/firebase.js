// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogify-4740f.firebaseapp.com",
  projectId: "blogify-4740f",
  storageBucket: "blogify-4740f.firebasestorage.app",
  messagingSenderId: "917861207020",
  appId: "1:917861207020:web:329942801b01def9970ec9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);