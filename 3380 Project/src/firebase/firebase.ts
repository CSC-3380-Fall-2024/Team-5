// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"; //"https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0tlHTzXRoG-3ptRgNfEAc2qGWiFSVQww",
  authDomain: "task-management-website-e6db8.firebaseapp.com",
  projectId: "task-management-website-e6db8",
  storageBucket: "task-management-website-e6db8.firebasestorage.app",
  messagingSenderId: "357576420173",
  appId: "1:357576420173:web:1e07195c1c04580f602504",
  measurementId: "G-V95SLHVBBE",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

//Authentication
export const auth = getAuth(app);
export const database = getFirestore(app);
export default app;
const analytics = getAnalytics(app);
