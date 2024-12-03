import { useState } from "react";
import { IoLogoGoogle } from "react-icons/io5";
import "../CSS Files/signUp.css";
import { Link } from "react-router-dom";
import {useUserAuth} from "../components/UserAuthContext"
function SignUp() {
  const [isShowed, setIsShowed] = useState(false);
  return (
    <div className="container">
      <div className="container-wrap">
        <h2 className="heading">Create account</h2>
        <div>
          <button className="signup_social">
            <i className="icon">
              <IoLogoGoogle />
            </i>
            <span className="singup-social-text">Sign up with Google</span>
          </button>
        </div>

        <p className="or">
          <span>Or</span>
        </p>
        <form action="#" className="signup-form">
          <div className="message"></div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="signupInput"
            placeholder="Eg: John"
            required
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="signupInput"
            placeholder="Eg: Doe"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="signupInput"
            placeholder="Eg: johndoe@gmail.com"
            required
          />
          <label htmlFor="passWord">Password</label>
          <input
            type="text"
            className="signupInput"
            placeholder="Eg: *******"
            required
          />
          <button className="btnSubmit">Sign up</button>
          <p>
            Already have an account?<Link to="/signIn">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
