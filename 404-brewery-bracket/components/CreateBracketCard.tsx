import React, { useContext, useEffect, useState } from "react";
import Portal from "./Portal";
import Bracket from "../pages/api/Firebase/Models/Bracket";
import Link from "next/dist/client/link";
import styles from "../styles/components/AddBracketCard.module.scss";
import { UserContext } from "../lib/context";

const CreateBracketCard = (props) => {
  const [showModal, setShowModal]: [{}, any] = useState({ display: "none" });
  const {user, username} = useContext(UserContext);
  const [hasPulledData, setHasPulledData]: [boolean, any] = useState(false);

  const CreateBracket = async (bracketName: string) => {
    try {
      const request = {
        userId: user.uid,
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
          response = new Bracket(JSON.parse(JSON.stringify(response.bracket)))
          props.SetBracketsAfterACreation(response);
        });
    }
    catch {
      return null;
    }
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max).toString();
  }

  const ChangeShowModal = () => {
    setShowModal(() => {
      if (showModal["display"] === "none") return { display: "" };
      else return { display: "none" };
    });
  };

  return (
    <button className={styles.addCardCont}>
      <div
        className={styles.addCardBody}
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
    </button>
  );
};

export default CreateBracketCard;
