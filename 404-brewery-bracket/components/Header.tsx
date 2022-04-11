import React, { useEffect } from "react";
import styles from "../styles/Header.module.scss";
import Link from "next/dist/client/link";
import OptionsAccordion from "./OptionsAccordion";

import { User } from "firebase/auth";

const Header = (props) => {
  return (
    <div className={styles.navBar}>
      <Link href="/">
        <h1>Brewery Bracket</h1>
      </Link>
      <OptionsAccordion
        options={[
          ["/", "Breweries"],
          ["/account", "Account"],
          ["/login-form", "Signup / log-in"],
        ]}
      />
      {/*
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
        </Link> */}
    </div>
  );
};

export default Header;
