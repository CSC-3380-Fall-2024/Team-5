import { useState } from "react";
import { IoLogoGoogle, IoEyeOff, IoEye } from "react-icons/io5";
import "../CSS Files/signUp.css";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import { auth, database } from "../fireBase";
import { setDoc, doc } from "firebase/firestore";

function SignUp() {
  const [isShowed, setIsShowed] = useState(false);
  return (
    <div className="container">
      <div className="container-wrap">
        <h2 className="heading">Create account</h2>
        <div>
          <button className="signup-social">
            <i className="icon">
              <IoLogoGoogle />
            </i>
            <span className="singup-social-text">Sign up with Google</span>
          </button>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <p className="or">
          <span>Or</span>
        </p>
        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            className="signupInput"
            placeholder="Eg: John"
            onChange={(e) => setfirstName(e.target.value)}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            className="signupInput"
            placeholder="Eg: Doe"
            onChange={(e) => setlastName(e.target.value)}
            required
          />
          <label>Email</label>
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
              type={isShowed === true ? "text" : "password"}
              className="signupInput"
              placeholder="Eg: *******"
              required
            />
            <i className="icon-eye" onClick={() => setIsShowed(!isShowed)}>
              {isShowed === true ? <IoEye /> : <IoEyeOff />}
            </i>
          </div>

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
