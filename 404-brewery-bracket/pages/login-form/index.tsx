import React, { useState } from "react";
import styles from "../../styles/Login-Form.module.scss";

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

    const response = await fetch("/api/Firebase/Login", {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();

    console.log("Login attempted");

    console.log(data);
  };

  const createUser = async () => {
    var auth: authentication = {
      email: email,
      password: password,
    };

    const response = await fetch("/api/Firebase/CreateUser", {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();

    console.log("User creation attempted.");
  };

  const logOut = async () => {
    const response = await fetch("/api/Firebase/Logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  return (
    <div className={styles.pageBackdrop}>
      <div className={styles.aroundForm}>
        <div className={styles.loginModal}>
          <img
            className={styles.logoImage}
            src="/Frothy-Beer.jpg"
            alt="Frothy Beer"
          />

          <div className={styles.Textboxes}>
            <input
              placeholder="Email"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              placeholder="Password"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button className={styles.loginButton} onClick={tryLogin}>
            Log in
          </button>
          <button className={styles.createUserButton} onClick={createUser}>
            Create Account
          </button>
        </div>
        <p>
          <a
            href="/login-form/logout"
            className={styles.hypertext}
            onClick={logOut}
          >
            Logout
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
