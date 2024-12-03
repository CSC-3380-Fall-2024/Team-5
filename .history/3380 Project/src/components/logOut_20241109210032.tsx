import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import "../CSS Files/logOut.css";
import "../CSS FIles/App.css"
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
    <div className = "logout-container"> 
    <h2>
      <div>
        <p>Welcome, {currentUser?.firstName}</p>
      </div>
      
      <button onClick={handleSignOut} className="header">
        Logout
      </button>
      </li>
    </h2>
    </ul>

    
  );
}
export default LogOut;
