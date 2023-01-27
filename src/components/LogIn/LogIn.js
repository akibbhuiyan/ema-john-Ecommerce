import React, { useContext } from "react";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { FacebookAuthProvider } from "firebase/auth";
import { UserContext } from "./../../App";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

initializeApp(firebaseConfig);
function LogIn() {
  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    newUser: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let navigate = useNavigate();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const auth = getAuth();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const { displayName, email, photoURL } = user;
        const signedUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedUser);
        setLoggedInUser(signedUser);
        navigate(-2, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };
  const handleFbSignIn = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        const { displayName, email, photoURL } = user;
        const fbsignedUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(fbsignedUser);
        setLoggedInUser(fbsignedUser);
        navigate(-2, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        const signOutUser = {
          isSignIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(signOutUser);
        setLoggedInUser(signOutUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(() => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          upadateUserName(user.name);
          setLoggedInUser(newUserInfo);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error =
            "This Email Address is already used in another Account";
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          navigate(-2, { replace: true });
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "Wrong Email or Password";
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };
  const handleBlur = (e) => {
    console.log(e.target.value);
    let isFeildValid = true;
    if (e.target.name === "email") {
      isFeildValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPassValid = e.target.value.length > 6;
      const passHasNumber = /\d{1}/.test(e.target.value);
      isFeildValid = isPassValid && passHasNumber;
    }
    if (isFeildValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const upadateUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("Name Updated Succesfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(user);
  return (
    <div style={{ textAlign: "center" }} className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        <h1>Sign Up Or Sign In</h1>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="Enter Your Name"
          />
        )}
        <br />
        <input
          type="email"
          name="email"
          onBlur={handleBlur}
          placeholder="Enter Your Email..."
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          id=""
          placeholder="Enter Your Password..."
          autoComplete="false"
        />
        <br />
        <span>
          New User ? Sign Up Here <br />
          <a onClick={() => setNewUser(!newUser)}> Sign Up</a>
        </span>
        <br />
        <input
          type="submit"
          value={newUser ? "Sign Up" : "Log In"}
          className="submit-btn btn btn-primary"
        />
      </form>
      <br />
      {user.isSignIn ? (
        <button onClick={handleSignOut}>sign Out</button>
      ) : (
        <button className="social-btn" onClick={handleSignIn}>
          <FaGoogle />
          <span>Sign In With Google</span>
        </button>
      )}
      <button className="social-btn" onClick={handleFbSignIn}>
        <FaFacebookF />
        <span>Log In With Facebook</span>
      </button>
      <br />

      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged In"} Succesfully
        </p>
      )}
      <p style={{ color: "red" }}>{user.error}</p>
    </div>
  );
}

export default LogIn;
