import React, { useState } from "react";
import Header from "../../../components/Header";
import styles from "../../../styles/Login-Form.module.scss";

const Logout: React.FC = () => {
  return (
    <div>
      <Header />
      <div className={styles.pageBackdrop}>
        <div className={styles.frame}>
          <h4>You have been logged out.</h4>
        </div>
      </div>
    </div>
  );
};

export default Logout;
