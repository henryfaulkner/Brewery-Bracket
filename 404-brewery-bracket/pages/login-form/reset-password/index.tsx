import React, { useState } from "react";
import Head from "next/head";
import { auth } from "../../../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import styles from "../../../styles/ResetPasswordPage.module.scss";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const sendResetPasswordEmail = async () => {
    sendPasswordResetEmail(auth, email);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Reset Password Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="Description"
          content="Reset your Brewery Bracket password via email."
        />
        <meta name="Keywords" content="Brewery Bracket" />
      </Head>
      <h2>Email to send password reset:</h2>
      <input
        className={styles.textbox}
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={sendResetPasswordEmail}>Send Reset Email</button>
    </div>
  );
};

export default ResetPasswordPage;
