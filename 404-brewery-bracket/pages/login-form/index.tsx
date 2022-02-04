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
    const response = await fetch("/api/Firebase/LoginAttempt");
    const data = await response.json();

    console.log("Login attempted");
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

  return (
    <div className={styles.pageBackdrop}>
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
    </div>
  );
};

export default LoginForm;
