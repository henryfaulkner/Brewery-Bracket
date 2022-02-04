import React, { useState } from "react";
import styles from "../../styles/Login-Form.module.scss";

type authentication = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState(0);

  const tryLogin = async () => {
    const response = await fetch("/api/Firebase/LoginAttempt");
    const data = await response.json();

    console.log("Login attempted");
  };

  const createUser = async () => {
    var auth: authentication = {
      username: document.getElementById("email").innerText,
      password: document.getElementById("password").innerText,
    };

    var queryString: string = createQueryString(auth);

    const response = await fetch("/api/Firebase/CreateUser?" + auth);
    const data = await response.json();

    console.log("Login attempted");
  };

  const createQueryString = (paramsObj: object) => {
    var parameters = [];
    for (var property in paramsObj) {
      if (paramsObj.hasOwnProperty(property)) {
        parameters.push(encodeURI(property + "=" + paramsObj[property]));
      }
    }

    return parameters.join("&");
  };

  return (
    <div className={styles.pageBackdrop}>
      <div className={styles.loginModal}>
        <img
          className={styles.logoImage}
          src="/Frothy-Beer.jpg"
          alt="Frothy Beer"
        />
        <input placeholder="Email" id="email" />
        <input placeholder="Password" id="password" />
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
