// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import{getAuth} from "firebase/auth"}
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKibGVw_uoTs9ewxJsbL7hQBCGKX83EBo",
  authDomain: "demologin-5ef72.firebaseapp.com",
  projectId: "demologin-5ef72",
  storageBucket: "demologin-5ef72.appspot.com",
  messagingSenderId: "865731909896",
  appId: "1:865731909896:web:2e3c873744b015a733b4bd",
  measurementId: "G-HH6VKNTECS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;