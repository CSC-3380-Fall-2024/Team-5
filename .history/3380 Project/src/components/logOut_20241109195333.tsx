import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import "../CSS Files/SubjectTabs.css";"
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
    <div>
      <div>
        <p>Welcome, {currentUser?.firstName}</p>
      </div>
      <button onClick={handleSignOut} className="border">
        Logout
      </button>
    </div>
  );
}
export default LogOut;
