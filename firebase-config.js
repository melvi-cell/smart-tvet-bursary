// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc, getDoc, deleteDoc, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Your Firebase configuration
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
const storage = getStorage(app);

// Make available globally
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDb = db;
window.firebaseStorage = storage;
window.firebaseCreateUser = createUserWithEmailAndPassword;
window.firebaseSignIn = signInWithEmailAndPassword;
window.firebaseSignOut = signOut;
window.firebaseOnAuthStateChanged = onAuthStateChanged;
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
window.firebaseDeleteDoc = deleteDoc;
window.firebaseOrderBy = orderBy;
window.firebaseLimit = limit;

// Storage functions
window.firebaseRef = ref;
window.firebaseUploadBytes = uploadBytes;
window.firebaseGetDownloadURL = getDownloadURL;

console.log("🔥 Firebase initialized successfully!");