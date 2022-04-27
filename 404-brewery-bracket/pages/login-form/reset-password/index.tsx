import React, { useState } from "react";
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
