import React, { useEffect, useState, useContext} from "react";
import styles from "../styles/Header.module.scss";
import Link from "next/dist/client/link";
import OptionsAccordion from "./OptionsAccordion";
import { UserContext } from "../lib/context";
import { User } from "firebase/auth";

const Header = (props) => {
  const {user, username} = useContext(UserContext);
  return (
    <div className={styles.navBar}>
      <Link href="/">
        <h1 tabIndex={0}>Brewery Bracket</h1>
      </Link>
      <OptionsAccordion
        options={[
          ["/", "Breweries"],
          ["/account", "Account"],
          ["/login-form", username ? "Hello " : "Signup / log-in"],
        ]}
      />
    </div>
  );
};

export default Header;
