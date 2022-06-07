// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-P6srDum6BdzkMhJLHVV-U7E6iNcxnHA",
  authDomain: "todolist-426c9.firebaseapp.com",
  projectId: "todolist-426c9",
  storageBucket: "todolist-426c9.appspot.com",
  messagingSenderId: "583799824745",
  appId: "1:583799824745:web:37d5aa0ad8c85346cf1df8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();