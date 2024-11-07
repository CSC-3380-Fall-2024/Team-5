// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIEdb5s-OadAMVbagMRjLpgYuO7Gy2Tx4",
  authDomain: "project-management-team5.firebaseapp.com",
  projectId: "project-management-team5",
  storageBucket: "project-management-team5.firebasestorage.app",
  messagingSenderId: "142493769762",
  appId: "1:142493769762:web:d4b7300f12f08a9669aa7b",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

//Authentication
export const auth = getAuth(app);
export const database = getFirestore(app);
export default app;
