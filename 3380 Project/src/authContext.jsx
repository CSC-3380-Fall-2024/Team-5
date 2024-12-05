import React, { useContext, useState, useEffect } from "react";
import { auth, database } from "./firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  const [users, setUsers] = useState([]);
  const teamId = "Tl7Ph2s1udw5ceTihmDJ";


  function signup(email, password) {
    console.log(auth.currentUser);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    console.log(auth.currentUser);
    console.log("Email", email);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function logout() {
    return signOut(auth);
  }
  async function getUsers() {
    const querySnapshot = await getDocs(
      collection(database, `teams/${teamId}/members/`)
    );

    const users = querySnapshot.docs.map((doc) => ({
      key: doc.id,
      ...doc.data(),
    }));
    setUsers(users);
  }
  useEffect(() => {
    getUsers();
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth", user);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    googleSignIn,
    signup,
    logout,
    users,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
