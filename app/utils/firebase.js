import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGxEAQD6rwo6MTMKhfoEV6PHgYlqJA8S8",
  authDomain: "final-project-ea09c.firebaseapp.com",
  databaseURL: "https://final-project-ea09c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "final-project-ea09c",
  storageBucket: "final-project-ea09c.appspot.com",
  messagingSenderId: "76003314354",
  appId: "1:76003314354:web:5015ee729105d53b2617ab"
};

// CEK DULU SEBELUM INISIALISASI!
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);

export { db, ref, onValue, set };
