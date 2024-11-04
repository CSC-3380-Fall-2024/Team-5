import { useState } from "react";
import { IoLogoGoogle } from "react-icons/io5";
import "../CSS Files/signUp.css";
import { Link } from "react-router-dom";
function SignIn() {
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
            required
          />
          <label htmlFor="passWord">Password</label>
          <input
            type="text"
            className="signupInput"
            placeholder="Eg: *******"
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
export default SignIn;
