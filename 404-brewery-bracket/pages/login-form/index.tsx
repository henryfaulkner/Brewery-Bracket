import React, { useState } from "react";
import styles from "../../styles/Login-Form.module.scss";
import Image from "next/image";
import { UserContext } from "../../lib/context";
import { useContext } from "react";
import { auth } from "../../lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Router from "next/router";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState("password");

  const tryLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
    .then(user => {
      Router.push("/")
    });
  };

  const createUser = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // We globally track auth state, so user auto updates
        // Need to redirect/provide confirmation here
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // something perhaps
      });
  };

  const logOut = async () => {
    signOut(auth);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginModal}>
        <div className={styles.loginImageAligner}>
          <div className={`image-container ${styles.loginImage}`}>
            <Image
              src="/Frothy-Beer.jpg"
              alt="Frothy Beer"
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>
        </div>
        <div className={styles.textBoxes}>
          <input
            placeholder="Email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            type="text"
          />
          <input
            placeholder="Password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            type={passwordVisibility}
          />
          {/* <input
            type="checkbox"
            onClick={() => {
              passwordVisibility === "password"
                ? setPasswordVisibility("text")
                : setPasswordVisibility("password");
            }}
          /> 
          <p>Show Password</p>*/}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.loginButton} onClick={tryLogin}>
            Log in
          </button>
          <button className={styles.createUserButton} onClick={createUser}>
            Create Account
          </button>
        </div>
      </div>
      <a href="/login-form/logout" className={styles.logout} onClick={logOut}>
        Logout
      </a>
    </div>
  );
};

export default LoginForm;
