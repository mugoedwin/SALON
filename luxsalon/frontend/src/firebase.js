import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC6D0oAbc5YWOc54bzssDM6vNpIXJDwS-o",
  authDomain: "rose-glow-salon.firebaseapp.com",
  databaseURL: "https://rose-glow-salon-default-rtdb.firebaseio.com",
  projectId: "rose-glow-salon",
  storageBucket: "rose-glow-salon.firebasestorage.app",
  messagingSenderId: "588304750594",
  appId: "1:588304750594:web:8db7eb3c6ebc2a994d2f1b",
  measurementId: "G-PNF873700G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
