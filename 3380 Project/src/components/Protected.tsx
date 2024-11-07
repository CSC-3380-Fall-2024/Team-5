import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";
function ProtectedRoute({ children }) {
  const { getContacts } = useAuth();
  if (!getContacts) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
