import React, { useContext, useEffect, useState } from "react";
import Portal from "./Portal";
import Bracket from "../pages/api/Firebase/Models/Bracket";
import Link from "next/dist/client/link";
import styles from "../styles/ActiveBracketCard.module.scss";
import { UserContext } from "../lib/context";

const CreateBracketCard = (props) => {
  const [bracketID, setBracketID]: [string, any] = useState("");
  const [showModal, setShowModal]: [{}, any] = useState({ display: "none" });
  const {user, username} = useContext(UserContext);
  const [hasPulledData, setHasPulledData]: [boolean, any] = useState(false);

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

  const ChangeShowModal = () => {
    setShowModal(() => {
      if (showModal["display"] === "none") return { display: "" };
      else return { display: "none" };
    });
  };

  return (
    <div className={styles.abCardCont}>
      <div
        className={styles.abCardBody}
        onClick={() => {
          if (!username) ChangeShowModal();
        }}
      >
        <span
          className={styles.addBracketCard}
          onClick={() => CreateBracket("Bracket " + getRandomInt(100))}
        >
          +
        </span>
      </div>
      <Portal
        Type={"RedirectToLoginModal"}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default CreateBracketCard;
