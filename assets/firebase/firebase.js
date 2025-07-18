// firebase/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
    doc,        
  getDoc      
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRd9HeTBxcH9Cou60rLizy7p4ZgllmE00",
  authDomain: "blog-5cac6.firebaseapp.com",
  projectId: "blog-5cac6",
storageBucket: "blog-5cac6.appspot.com",
  messagingSenderId: "267086532182",
  appId: "1:267086532182:web:55f72b89397f8ade89f5f7",
  measurementId: "G-9RF6N1B5KH"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, signInWithEmailAndPassword, onAuthStateChanged, db, collection, addDoc, serverTimestamp, getDocs, query, orderBy,  doc,        
  getDoc       };
