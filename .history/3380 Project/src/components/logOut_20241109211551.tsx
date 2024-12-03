import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import "../CSS Files/logOut.css";
import "../CSS FIles/App.css"
const navigate = useNavigate();
function LogOut() {
  const { logout, currentUser } = useAuth();
  
  async function handleSignOut() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <div className = "">
        <p>Welcome, {currentUser?.firstName}</p>
    </div>
    <div className = "logout-container"> 
    <h2>
      
      
      <button onClick={handleSignOut} className="header">
        Logout
      </button>
      
    </h2>
    </div>

    
  );
}
export default LogOut;
