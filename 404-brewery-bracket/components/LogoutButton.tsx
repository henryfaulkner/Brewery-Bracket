import React from "react";
import styles from "../styles/components/LogoutButton.module.scss";
import { auth } from "../lib/firebase";


const CardInBracket = () => {
  return (
    <button 
    className={styles.logoutButtonStyles}
    onClick={() => auth.signOut()}
    >
        Logout
    </button>
  );
};

export default CardInBracket;
