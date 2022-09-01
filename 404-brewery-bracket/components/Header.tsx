import React, { useEffect, useState, useContext} from "react";
import styles from "../styles/foundational/Header.module.scss";
import Link from "next/dist/client/link";
import OptionsAccordion from "./OptionsAccordion";
import { UserContext } from "../lib/context";
import { User, getAuth } from "firebase/auth";

const Header = (props) => {
  const {user, username} = useContext(UserContext);
  return (
    <div className={styles.navBar}>
      <Link href="/">
        <h1 tabIndex={0}>Brewery Bracket</h1>
      </Link>
      <OptionsAccordion
        options={[
          ["/", "Home"],
          [username ? "/account": "/login-form", username ? "Account": "Signup / log-in"],
        ]}
      />
    </div>
  );
};

export default Header;
