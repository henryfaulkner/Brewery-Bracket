import React, { useEffect } from "react";
import styles from "../styles/Header.module.scss";
import Link from "next/dist/client/link";

import { User } from "firebase/auth";

type CurrentUserData = {
  CurrentUser: User;
};

let currentUser: CurrentUserData = null;

const Header = (props) => {
  useEffect(() => {
    getCurrentUser();
    alert("current user: " + JSON.stringify(currentUser));
  });

  const getCurrentUser = async () => {
    const response = await fetch("/api/Firebase/GetCurrentUser", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    currentUser = await response.json();
    console.log("Got current user.");
  };

  return (
    <div className={styles.navBar}>
      <Link href="/">
        <h1>Brewery Bracket</h1>
      </Link>
      <div className={styles.headerOptions}>
        <p className={styles.headerLink} onClick={props.breweries}>
          Breweries
        </p>
        <Link href="/account">
          <p className={styles.headerLink} onClick={props.account}>
            Account
          </p>
        </Link>
        <Link href="/login-form">
          <p className={styles.headerLink} onClick={props.account}>
            Signup
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
