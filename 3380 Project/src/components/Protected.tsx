import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";
function ProtectedRoute({ children }) {
  let { user } = useAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
