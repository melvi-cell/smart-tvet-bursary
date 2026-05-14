// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDBlls3pKTeHaRYuLSXAo4Xs8w-2IiRBEY",
    authDomain: "tvet-bursary-system.firebaseapp.com",
    projectId: "tvet-bursary-system",
    storageBucket: "tvet-bursary-system.firebasestorage.app",
    messagingSenderId: "711106582989",
    appId: "1:711106582989:web:1b4b484cc2636797c88c84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// MAKE ALL FUNCTIONS GLOBALLY AVAILABLE
window.firebaseAuth = auth;
window.firebaseDb = db;
window.firebaseCreateUser = createUserWithEmailAndPassword;
window.firebaseSignIn = signInWithEmailAndPassword;
window.firebaseSignOut = signOut;
window.firebaseSendEmailVerification = sendEmailVerification;
window.firebaseSendPasswordResetEmail = sendPasswordResetEmail;

// Firestore functions
window.firebaseCollection = collection;
window.firebaseAddDoc = addDoc;
window.firebaseGetDocs = getDocs;
window.firebaseQuery = query;
window.firebaseWhere = where;
window.firebaseUpdateDoc = updateDoc;
window.firebaseDoc = doc;
window.firebaseGetDoc = getDoc;

console.log("✅ Firebase initialized!");
console.log("✅ Functions available:", {
    createUser: typeof window.firebaseCreateUser,
    signIn: typeof window.firebaseSignIn,
    resetPass: typeof window.firebaseSendPasswordResetEmail
});