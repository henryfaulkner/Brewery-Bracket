import React, { useState } from "react";
import styles from "../../styles/Login-Form.module.scss";
import Image from "next/image";

type authentication = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const tryLogin = async () => {
    var auth: authentication = {
      email: email,
      password: password,
    };

    await fetch("/api/Firebase/Login", {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log("Login attempted");
  };

  const createUser = async () => {
    var auth: authentication = {
      email: email,
      password: password,
    };

    await fetch("/api/Firebase/CreateUser", {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log("User creation attempted.");
  };

  const logOut = async () => {
    await fetch("/api/Firebase/Logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginModal}>
        <div className="image-container">
          <Image
            src="/Frothy-Beer.jpg"
            alt="Frothy Beer"
            layout="fill"
            objectFit="contain"
          ></Image>
        </div>
        <div className={styles.textBoxes}>
          <input
            placeholder="Email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            data-cy="email"
          />
          <input
            placeholder="Password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            data-cy="password"
          />
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.loginButton}
            onClick={tryLogin}
            data-cy="login"
          >
            Log in
          </button>
          <button
            className={styles.createUserButton}
            onClick={createUser}
            data-cy="createuser"
          >
            Create Account
          </button>
        </div>
      </div>
      <a
        href="/login-form/logout"
        className={styles.logout}
        onClick={logOut}
        data-cy="logout"
      >
        Logout
      </a>
    </div>
  );
};

export default LoginForm;
