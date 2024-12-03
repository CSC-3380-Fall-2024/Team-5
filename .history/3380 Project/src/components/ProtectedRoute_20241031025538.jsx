import React from "react";
import { Navigate } from "react-router-dom";
3380 Project/src/pages/signIn.tsx
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;