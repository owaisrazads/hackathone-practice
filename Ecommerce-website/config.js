// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";



const firebaseConfig = {
  apiKey: "AIzaSyAaRKSJanhz6e5cHm5lCiKimcl16UFH-bk",
  authDomain: "practice-firebase-d8c41.firebaseapp.com",
  projectId: "practice-firebase-d8c41",
  storageBucket: "practice-firebase-d8c41.appspot.com",
  messagingSenderId: "392425559970",
  appId: "1:392425559970:web:169eb3a487089f33f2c4fb",
  measurementId: "G-TDXSP4TX68"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
