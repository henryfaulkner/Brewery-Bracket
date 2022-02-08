import React from "react";
import styles from "../styles/Header.module.scss";
import Link from "next/dist/client/link";

const Header = (props) => {
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
      </div>
    </div>
  );
};

export default Header;
