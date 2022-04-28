import React, { useState } from "react";
import Head from "next/head";
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
import Portal from "../../components/Portal";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUid] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [showModal, setShowModal]: [{}, any] = useState({ display: "none" });

  const tryLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // We globally track auth state, so user auto updates
        // Need to redirect/provide confirmation here
        tryLogin();
        //Show Modal
        setShowModal(() => {
          if (showModal["display"] === "none") return { display: "" };
          else return { display: "none" };
        });
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
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="Description"
          content="Sign up for the best brewery bracket app on the market! It's completely Free!"
        />
        <meta name="Keywords" content="Brewery Bracket" />
        <meta name="Keywords" content="Account" />
      </Head>
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
          <button
            className={styles.loginButton}
            onClick={() => {
              tryLogin();
              Router.push("/");
            }}
          >
            Log in
          </button>
          <button className={styles.createUserButton} onClick={createUser}>
            Create Account
          </button>
          <Portal
            Type={"UsernameModal"}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
      </div>
      <a href="/login-form/logout" className={styles.logout} onClick={logOut}>
        Logout
      </a>
      <a href="/login-form/reset-password" className={styles.logout}>
        Reset Password
      </a>
    </div>
  );
};

export default LoginForm;
