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
    </div>
  );
};

export default Header;
