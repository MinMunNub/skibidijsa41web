// FIREBASE.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, set, push, update, onValue, runTransaction, remove } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getStorage, ref as sref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbhrm5M-ObzigDzg1wPal8nm8eIPAyLmY",
  authDomain: "skibidipc-d428d.firebaseapp.com",
  databaseURL: "https://skibidipc-d428d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "skibidipc-d428d",
  storageBucket: "skibidipc-d428d.appspot.com",   
  messagingSenderId: "24231362521",
  appId: "1:24231362521:web:f96e474dba7faaf36ba3c8",
  measurementId: "G-4YK6WG0HSJ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

export { db, storage, ref, set, push, update, onValue, runTransaction, remove, sref as storageRef, uploadBytes, getDownloadURL, deleteObject };
