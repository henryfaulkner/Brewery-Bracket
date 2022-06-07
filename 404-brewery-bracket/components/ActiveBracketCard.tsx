import React, { useEffect, useState, useContext } from "react";
import Portal from "./Portal";
import Link from "next/dist/client/link";
import styles from "../styles/components/ActiveBracketCard.module.scss";
import { UserContext } from "../lib/context";
import Bracket from "../pages/api/Firebase/Models/Bracket";

type Props = () => {
  bracket: Bracket;
  DeleteBracketFromList: (bracket) => void;
};

const ActiveBracketCard = (props) => {
  const [showModal, setShowModal]: [{}, any] = useState({ display: "none" });
  const [isLink, setIsLink]: [Element[], any] = useState();
  const [isHover, setIsHover] = useState(false);
  const { user, username } = useContext(UserContext);
  const ariaLinkLabel = "Go to " + props.bracket.BracketName;
  useEffect(() => {
    if (user) {
      setIsLink(
        <Link href={`/bracket-creator/${props.bracket.DocumentID}`}>
          <h3>{props.bracket.BracketName}</h3>
        </Link>
      );
    } else {
      setIsLink(<h3>{props.bracket.BracketName}</h3>);
    }
  }, [props.bracket]);

  const ChangeShowModal = () => {
    setShowModal(() => {
      if (showModal["display"] === "none") return { display: "" };
      else return { display: "none" };
    });
  };

  const DeleteBracket = () => {
    try {
      const request = {
        bracketID: props.bracket.DocumentID,
        groupID: props.bracket.GroupID,
      };

      //No need to await
      fetch("/api/Firebase/Endpoints/DeleteBracketIfOwner", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      props.DeleteBracketFromList(props.bracket);
    } catch (exception) {
      return null;
    }
  };

  return (
    <div className={styles.abCardCont}>
      <div className={styles.abCardBody}>
        {isLink}
        <div className={styles.actionsContainer}>
          <button aria-label="Delete Bracket" className={styles.delete} onClick={DeleteBracket}>X</button>
          <Link href={`/bracket-creator/${props.bracket.DocumentID}`}>
            <a aria-label={ariaLinkLabel} className={styles.procede}>-&gt;</a>
        </Link>
        </div>
      </div>
      <Portal
        Type={"RedirectToLoginModal"}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default ActiveBracketCard;
