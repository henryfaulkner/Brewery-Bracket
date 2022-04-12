import React, { useEffect, useState } from "react";
import Portal from "./Portal";
import Link from "next/dist/client/link";
import styles from "../styles/ActiveBracketCard.module.scss";
import { checkCookies } from "cookies-next";

const ActiveBracketCard = (props) => {
  const [showModal, setShowModal]: [{}, any] = useState({ display: "none" });
  const [isSignedIn, setIsSignedIn]: [boolean, any] = useState();
  const [isLink, setIsLink]: [Element[], any] = useState();
  const [hasPulledData, setHasPulledData] = useState(false);
  useEffect(() => {
    if (hasPulledData === false) {
      if (checkCookies("auth-token")) {
        setIsSignedIn(true);
        setIsLink(
          <Link href={`/bracket-creator/${props.bracket.DocumentID}`}>
            <h1>{props.bracket.BracketName}</h1>
          </Link>
        );
      } else {
        setIsSignedIn(false);
        setIsLink(<h1>{props.bracket.BracketName}</h1>);
      }
      setHasPulledData(true);
    }
  }, [props.bracket]);

  const ChangeShowModal = () => {
    setShowModal(() => {
      if (showModal["display"] === "none") return { display: "" };
      else return { display: "none" };
    });
  };

  return (
    <div
      className={styles.abCardCont}
      onClick={() => {
        if (!isSignedIn) ChangeShowModal();
      }}
    >
      <div className={styles.abCardBody}>{isLink}</div>
      <Portal
        Type={"RedirectToLoginModal"}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default ActiveBracketCard;
