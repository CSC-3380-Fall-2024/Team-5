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
    <ul className = "sidebar-list"> 
    <h2>
      <div>
        <p>Welcome, {currentUser?.firstName}</p>
      </div>
      <button onClick={handleSignOut} className="header">
        Logout
      </button>
    </h2>
    </div>
    <ul
  );
}
export default LogOut;
