import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
function LogOut() {
  const { logout, user } = useAuth();
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
        <p>Welcome, {user?.displayName}</p>
      </div>
      <button onClick={handleSignOut} className="border">
        Logout
      </button>
    </div>
  );
}
export default LogOut;