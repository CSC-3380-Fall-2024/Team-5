import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import "../CSS Files/logOut.css";
import "../CSS FIles/App.css";
import { useState } from "react";
function LogOut() {
  const { logout, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      setLoading(true);
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <div className="logout-container">
      {currentUser ? (
        <button disabled={loading} onClick={handleSignOut} className="header">
          Logout
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default LogOut;
