import React, { useEffect, useState } from "react";
import Link from "next/dist/client/link";
import styles from "../styles/ActiveBracketCard.module.scss";

const ActiveBracketCard = (props) => {
  useEffect(() => {}, props.bracket);

  return (
    <div className={styles.abCardCont}>
      <div className={styles.abCardBody}>
        <Link href={`/bracket-creator/${props.bracket.DocumentID}`}>
          <h1>{props.bracket.BracketName}</h1>
        </Link>
      </div>
    </div>
  );
};

export default ActiveBracketCard;
