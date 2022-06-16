import React, { useState } from "react";
import Head from "next/head";
import styles from "../../styles/pages/LoginForm.module.scss";
import Image from "next/image";
import { auth } from "../../lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Router from "next/router";
import Portal from "../../components/Portal";
import OpenEye from "../../components/svgs/OpenEye";
import ClosedEye from "../../components/svgs/ClosedEye";

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
            className={styles.emailInput}
            onChange={(event) => setEmail(event.target.value)}
            type="text"
          />
          <div className={styles.passwordBtnCont}>
            <input
              className={styles.passwordInput}
              placeholder="Password"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              type={passwordVisibility}
            />
            <button
              className={styles.showPasswordBtn}
              aria-label="Show or hide password"
              onClick={() => {
                passwordVisibility === "password"
                  ? setPasswordVisibility("text")
                  : setPasswordVisibility("password");
              }}
            >
              {passwordVisibility === "password" ? 
              <OpenEye className={styles.openSVG} /> : <ClosedEye className={styles.closedSVG} />}
            </button>
          </div>
        </div>
        <div className={styles.loginButtonContainer}>
          <button
            className={styles.loginButton}
            onClick={() => {
              tryLogin();
              Router.push("/");
            }}
          >
            Log in
          </button>

          <Portal
            Type={"UsernameModal"}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
        <hr className={styles.hrLine}/>
        <h3>Don't have an account?</h3>
        <button className={styles.createUserButton} onClick={createUser}>
          Create One
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
