import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";
interface ProtectedRouteProps {
  children: React.ReactNode;
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
