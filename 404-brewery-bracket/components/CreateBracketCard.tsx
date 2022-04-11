import React, { useEffect, useState } from "react";
import Bracket from "../pages/api/Firebase/Models/Bracket";
import Link from "next/dist/client/link";
import styles from "../styles/ActiveBracketCard.module.scss";

const CreateBracketCard = (props) => {
  const [bracketID, setBracketID]: [string, any] = useState("");

  const CreateBracket = async (bracketName: string) => {
    const request = {
      BracketName: bracketName,
    };
    await fetch("/api/Firebase/Endpoints/CreateBracket", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setBracketID(response["bracketID"]);

        props.SetBracketsAfterACreation(new Bracket(response));
        console.log("Bracket creation response: " + JSON.stringify(response));
      });
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max).toString();
  }
  console.log(JSON.stringify(props.bracket));

  return (
    <div className={styles.abCardCont}>
      <div className={styles.abCardBody}>
        <span
          className={styles.addBracketCard}
          onClick={() => CreateBracket("Bracket " + getRandomInt(100))}
        >
          +
        </span>
      </div>
    </div>
  );
};

export default CreateBracketCard;
