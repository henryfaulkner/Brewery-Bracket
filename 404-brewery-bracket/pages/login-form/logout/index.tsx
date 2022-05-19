import React, { useState } from "react";
import Head from "next/head";
import styles from "../../../styles/pages/Login-Form.module.scss";

const Logout: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Logout Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="Description" content="Logout of your account." />
        <meta name="Keywords" content="Brewery Bracket" />
      </Head>
      <div className={styles.pageBackdrop}>
        <div className={styles.frame}>
          <h4>You have been logged out.</h4>
        </div>
      </div>
    </div>
  );
};

export default Logout;
