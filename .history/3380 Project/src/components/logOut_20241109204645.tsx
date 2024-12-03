import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import "../CSS Files/logOut.css";
function LogOut() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  async function handleSignOut() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <h2>
      <div>
        <p>Welcome, {currentUser?.firstName}</p>
      </div>
      <button onClick={handleSignOut} className="button-container">
        Logout
      </button>
    </h2>
  );
}
export default LogOut;
