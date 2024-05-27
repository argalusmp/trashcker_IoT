import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD-GwRJ7elZ-0_asJmliHJQG22j0ygFRKw",
    authDomain: "trashcker-fadc4.firebaseapp.com",
    projectId: "trashcker-fadc4",
    storageBucket: "trashcker-fadc4.appspot.com",
    messagingSenderId: "1071936640904",
    appId: "1:1071936640904:web:a498cf8a547892cbbc8c3d"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth};
