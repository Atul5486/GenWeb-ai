// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-3eaeb.firebaseapp.com",
  projectId: "genwebai-3eaeb",
  storageBucket: "genwebai-3eaeb.firebasestorage.app",
  messagingSenderId: "406043338810",
  appId: "1:406043338810:web:97db1500e816689a15ed03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider};