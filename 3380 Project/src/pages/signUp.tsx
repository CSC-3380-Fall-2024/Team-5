import { useEffect, useState } from "react";

import { IoLogoGoogle, IoEyeOff, IoEye } from "react-icons/io5";
import { Alert } from "react-bootstrap";
import "../CSS Files/signUp.css";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import { auth, database } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

function SignUp() {
  const [isShowed, setIsShowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, googleSignIn } = useAuth();
  const teamId = "Tl7Ph2s1udw5ceTihmDJ";

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      if (signup) {
        await setDoc(
          doc(database, `teams/${teamId}/members/`, auth.currentUser.uid),
          {
            email: auth.currentUser.email,
            firstName: firstName,
            lastName: lastName,
            password: password,
          }
        );
      }
      window.location.href = "/";
    } catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      await googleSignIn();

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
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <div className="container-wrap">
        <h2 className="heading">Create account</h2>
        <div>
          <button className="signup-social" onClick={handleGoogleLogin}>
            <i className="icon">
              <IoLogoGoogle />
            </i>
            <span className="singup-social-text">Sign up with Google</span>
          </button>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
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
            <label>Password</label>
            <input
              type={isShowed === true ? "text" : "password"}
              className="signupInput"
              placeholder="Eg: *******"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="icon-eye" onClick={() => setIsShowed(!isShowed)}>
              {isShowed === true ? <IoEye /> : <IoEyeOff />}
            </i>
          </div>

          <button disabled={loading} className="btnSubmit">
            Sign up
          </button>
          <p>
            Already have an account?<Link to="/signIn">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
