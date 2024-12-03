import { useState } from "react";
import { IoLogoGoogle } from "react-icons/io5";
import "../CSS Files/signUp.css";
import { Link } from "react-router-dom";
import {Form, Alert } from "react-bootstrap";
import {useUserAuth} from "../UserAuthContext.jsx";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container">
      <div className="container-wrap">
        <h2 className="heading">Sign In</h2>
        <button className="signup_social">
          <i className="icon">
            <IoLogoGoogle />
            
          </i>
          <span className="singup-social-text">Sign in with Google</span>
        </button>
        <p className="or">
          <span>Or</span>
        </p>
        <form action="#" className="signup-form">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="signupInput"
            placeholder="Eg: johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="passWord">Password</label>
          <input
            type="text"
            className="signupInput"
            placeholder="Eg: *******"
            onChange={(e)=> setPassword(e.target.value)}
            required
          />
          <button className="btnSubmit">Sign in</button>
          <p>
            Do not have an account yet?<Link to="/signUp">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
