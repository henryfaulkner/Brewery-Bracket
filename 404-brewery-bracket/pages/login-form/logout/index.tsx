import React, { useState } from "react";
import Header from "../../../components/Header";
import styles from "../../../styles/Login-Form.module.scss";

const Logout: React.FC = () => {
  return (
    <div className={styles.pageBackdrop}>
      <Header />
      <div className={styles.frame}>
        <h4>You have been logged out.</h4>
      </div>
    </div>
  );
};

export default Logout;