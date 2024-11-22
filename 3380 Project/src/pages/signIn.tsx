import { useState } from "react";
import { IoLogoGoogle, IoEyeOff, IoEye } from "react-icons/io5";
import "../CSS Files/signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import { Alert } from "react-bootstrap";
import { setDoc, doc } from "firebase/firestore";
import { auth, database } from "../firebase/firebase";

function SignIn() {
  const [isShowed, setIsShowed] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const teamId = "Tl7Ph2s1udw5ceTihmDJ";

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/CategoryCreation");
    } catch (error) {

      navigate("/signUp");
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      await googleSignIn();
      navigate("/CategoryCreation");
      if (googleSignIn) {

        await setDoc(
          doc(database, `teams/${teamId}/members/`, auth.currentUser.uid),
          {
            email: auth.currentUser.email,
            firstName: auth.currentUser.displayName,
            photo: auth.currentUser.photoURL,
            lastName: "",
          }
        );
        toast.success("User logged in succesfully", {
          position: "top-center",

        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
          <button disabled={loading} className="btnSubmit">
            Sign in
          </button>
          <p>
            Do not have an account yet?<Link to="/signUp">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default SignIn;
