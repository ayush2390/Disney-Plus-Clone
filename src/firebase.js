import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import {doc, setDoc, getDoc, onSnapshot, collection} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCduolJiZpWUwIYzwtdBJdRzBGAy8ctZUg",
  authDomain: "disneyplus-clone-37c94.firebaseapp.com",
  projectId: "disneyplus-clone-37c94",
  storageBucket: "disneyplus-clone-37c94.appspot.com",
  messagingSenderId: "957832332914",
  appId: "1:957832332914:web:176a35718215a10f38e4eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, doc, setDoc, getDoc, onSnapshot,collection };
export default db;