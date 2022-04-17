import React, { useEffect, useState, useContext } from "react";
import Portal from "./Portal";
import Link from "next/dist/client/link";
import styles from "../styles/ActiveBracketCard.module.scss";
import { UserContext } from "../lib/context";

const ActiveBracketCard = (props) => {
  const [showModal, setShowModal]: [{}, any] = useState({ display: "none" });
  const [isLink, setIsLink]: [Element[], any] = useState();
  const [hasPulledData, setHasPulledData] = useState(false);
  const {user, username} = useContext(UserContext);
  useEffect(() => {
    if (hasPulledData === false) {
      if (username) {
        setIsLink(
          <Link href={`/bracket-creator/${props.bracket.GetDocumentID}`}>
            <h1>{props.bracket.BracketName}</h1>
          </Link>
        );
      } else {
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
        if (!username) ChangeShowModal();
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
