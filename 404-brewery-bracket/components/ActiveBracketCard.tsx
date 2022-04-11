import React from "react";
import Link from "next/dist/client/link";
import styles from "../styles/ActiveBracketCard.module.scss";

const ActiveBracketCard = (props) => {
  const CreateBracket = async (bracketName: string) => {
    const request = {
      BracketName: bracketName,
    };
    console.log("cum: " + bracketName);
    await fetch("/api/Firebase/Endpoints/CreateBracket", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Bracket creation response: " + JSON.stringify(response));
      });
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max).toString();
  }

  return props.override ? (
    <div className={styles.abCardCont}>
      <div className={styles.abCardBody}>
        <Link href="/bracket-creator">
          <span
            className={styles.addBracketCard}
            onClick={() => CreateBracket("Bracket " + getRandomInt(100))}
          >
            +
          </span>
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
