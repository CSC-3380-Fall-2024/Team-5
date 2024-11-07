import React, { useContext, useState, useEffect } from "react";
import { auth, database } from "./fireBase";
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
  const [currentUser, setCurrentUser] = useState({});

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function logout() {
    return signOut(auth);
  }

  async function getContacts() {
    await authStateReady(auth);
    currentUser = auth.currentUser;

    if (!currentUser) return false;
    console.log(currentUser);
    return currentUser;
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth", user);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    googleSignIn,
    signup,
    logout,
    getContacts,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
