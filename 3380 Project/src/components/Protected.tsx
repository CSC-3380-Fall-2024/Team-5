import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
