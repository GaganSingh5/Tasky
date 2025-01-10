import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyAzedhzQwB_96B-LHOFaw49t0pgWPjEKqE",
  authDomain: "tasky-b04d2.firebaseapp.com",
  projectId: "tasky-b04d2",
  storageBucket: "tasky-b04d2.firebasestorage.app",
  messagingSenderId: "623985572469",
  appId: "1:623985572469:web:e613d0cc6a0fd32ca7d63c",
  measurementId: "G-Z7V4P04THR"
});

const db = getFirestore(firebaseConfig)
export { firebaseConfig as firebase, db as firestore };