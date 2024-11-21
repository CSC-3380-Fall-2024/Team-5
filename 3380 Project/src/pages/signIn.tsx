import { useState } from "react";
import { IoLogoGoogle, IoEyeOff, IoEye } from "react-icons/io5";
import "../CSS Files/signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import { Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { auth, database } from "../firebase/firebase";

function SignIn() {
  const [isShowed, setIsShowed] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const teamId = "Tl7Ph2s1udw5ceTihmDJ";

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");

      await login(email, password);
      navigate("/CategoryCreation");
      toast.success("Sign in Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      setError("Failed to log in");
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  }

  async function handleGoogleLogin() {
    try {
      await googleSignIn();
      navigate("/CategoryCreation");
      if (googleSignIn) {
        await setDoc(doc(database, "teams", auth.currentUser.uid), {
          email: auth.currentUser.email,
          firstName: auth.currentUser.displayName,
          photo: auth.currentUser.photoURL,
          lastName: "",
        });
        toast.success("User logged in succesfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
      <div className="container-wrap">
        <h2 className="heading">Sign In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <button className="signup-social" onClick={handleGoogleLogin}>
          <i className="icon">
            <IoLogoGoogle />
          </i>
          <span className="singup-social-text">Sign in with Google</span>
        </button>
        <p className="or">
          <span>Or</span>
        </p>

        <form action="#" className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="signupInput"
            placeholder="Eg: johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password">
            <label htmlFor="passWord">Password</label>
            <input
              type={isShowed ? "text" : "password"}
              className="signupInput"
              placeholder="Eg: *******"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="icon-eye" onClick={() => setIsShowed(!isShowed)}>
              {isShowed ? <IoEye /> : <IoEyeOff />}
            </i>
          </div>
          <button className="btnSubmit">Sign in</button>
          <p>
            Do not have an account yet?<Link to="/signUp">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default SignIn;
