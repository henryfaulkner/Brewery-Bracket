import React, { useEffect, useState, useContext } from "react";
import Portal from "./Portal";
import Link from "next/dist/client/link";
import styles from "../styles/components/ActiveBracketCard.module.scss";
import { UserContext } from "../lib/context";
import DeleteIcon from "./DeleteIcon";
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
  useEffect(() => {
    if (user) {
      console.log("props.bracket.GetDocumentID");
      console.log(props.bracket.DocumentID);
      setIsLink(
        <Link href={`/bracket-creator/${props.bracket.DocumentID}`}>
          <h1>{props.bracket.BracketName}</h1>
        </Link>
      );
    } else {
      setIsLink(<h1>{props.bracket.BracketName}</h1>);
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
      console.log("Error fetching the delete bracket endpoint.");
      return null;
    }
  };

  return (
    <div
      className={styles.abCardCont}
      onClick={() => {
        if (!username) ChangeShowModal();
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && <DeleteIcon DeleteOnClick={DeleteBracket} />}
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
