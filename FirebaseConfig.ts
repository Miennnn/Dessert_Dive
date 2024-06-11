import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZh1433bTr1HSfs_eDPoN3h1NmA89UtEk",
  authDomain: "dessertdive-66eec.firebaseapp.com",
  projectId: "dessertdive-66eec",
  storageBucket: "dessertdive-66eec.appspot.com",
  messagingSenderId: "225188201884",
  appId: "1:225188201884:web:66903b5999ea5cbf347459",
  measurementId: "G-DL0SLV0M09"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);