// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPkA-edGKL1j-PqnbnwUHKw1IlsVbkVao",
  authDomain: "dessertdive-f8790.firebaseapp.com",
  projectId: "dessertdive-f8790",
  storageBucket: "dessertdive-f8790.appspot.com",
  messagingSenderId: "823178801007",
  appId: "1:823178801007:web:dddfdc2900ee64a688429a"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);