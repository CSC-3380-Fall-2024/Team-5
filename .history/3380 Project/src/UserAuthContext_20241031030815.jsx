import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./fireBase";
//Creates context for data to be shared around
const userAuthContext = createContext();

//Provides context
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password, firstName, lastName) {
    return createUserWithEmailAndPassword(auth, email, password, firstName, lastName);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
//monitors authentication state (triggers callback whenever state changes)
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
    console.log("Auth", currentuser);
    setUser(currentuser);
  });

  return () => {
    unsubscribe();
  };
}, []);

return (
  <userAuthContext.Provider
    value={{ user, logIn, signUp, logOut, googleSignIn }}
  >
    {children}
  </userAuthContext.Provider>
);
}

  export function useUserAuth() {
    return useContext(userAuthContext);
  }