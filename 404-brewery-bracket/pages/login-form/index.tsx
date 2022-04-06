import React, { useState } from "react";
import styles from "../../styles/Login-Form.module.scss";
import Image from "next/image";
import { getCookie, setCookies } from "cookies-next";

type authentication = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState("password");

  const tryLogin = async () => {
    var auth: authentication = {
      email: email,
      password: password,
    };

    const response = await fetch("/api/Firebase/Endpoints/Login", {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    console.log("auth-token: " + getCookie("auth-token"));
    setCookies("cum-token", JSON.stringify(response.json));
    console.log("Login attempted");
    console.log("token: " + JSON.stringify(response.json));
  };

  const createUser = async () => {
    var auth: authentication = {
      email: email,
      password: password,
    };

    const response = await fetch("/api/Firebase/Endpoints/CreateUser", {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    console.log("User creation attempted.");
  };

  const logOut = async () => {
    const response = await fetch("/api/Firebase/Endpoints/Logout", {
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
