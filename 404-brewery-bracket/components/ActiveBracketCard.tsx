import React from "react";
import Link from "next/dist/client/link";
import styles from "../styles/ActiveBracketCard.module.scss";

const ActiveBracketCard = (props) => {
  return props.override ? (
    <div className={styles.abCardCont}>
      <div className={styles.abCardBody}>
        <Link href="/bracket-creator">
          <span className={styles.addBracketCard}>+</span>
        </Link>
      </div>
    </div>
  ) : (
    <div className={styles.abCardCont}>
      <div className={styles.abCardBody}>
        <h1>{props.bracketName}</h1>
      </div>
    </div>
  );
};

export default ActiveBracketCard;
