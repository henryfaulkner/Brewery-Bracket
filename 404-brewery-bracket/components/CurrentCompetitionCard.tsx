import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/dist/client/link";
import styles from "../styles/components/CurrentCompetitionCard.module.scss";
import { UserContext } from "../lib/context";
import BreweryDayScorecard from "../pages/api/Firebase/Models/BreweryDayScorecard";
import BreweryObject from "../pages/api/Firebase/Models/BreweryObject";
import DeleteIcon from "./DeleteIcon";
import BracketsBreweryObject from "../pages/api/Firebase/Models/BracketsBreweryObject";

type Props = {
  index: number;
  brewery: BracketsBreweryObject;
  changeOrder;
  bracketID: string;
  RemoveBrewery;
};

const Card: React.FC<Props> = (props) => {
  const [scorecard, setScorecard]: [BreweryDayScorecard, any] = useState(
    new BreweryDayScorecard({})
  );
  const { user, username } = useContext(UserContext);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    createOrGetScorecard(props.brewery.DocumentID, props.brewery.Name);
  }, [props.brewery.DocumentID, props.bracketID])

  const createOrGetScorecard = async (breweryId, breweryName) => {
    try {
      const request = {
        userId: user.uid,
        breweryID: breweryId,
        breweryName: breweryName,
        bracketID: props.bracketID,
      };

      return await fetch("/api/Firebase/Endpoints/CreateOrGetScorecard", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          const tempScorecard = new BreweryDayScorecard(res);
          setScorecard(tempScorecard);
        });
    } catch (ex) {
      return null;
    }
  };

  const DeleteScorecard = () => {
    props.RemoveBrewery(props.brewery.DocumentID);
    const request = {
      bracketId: props.bracketID,
      breweryId: props.brewery.DocumentID,
    };
    fetch("/api/Firebase/Endpoints/DeleteBreweryInBracket", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && <DeleteIcon DeleteOnClick={DeleteScorecard} />}
      <Link href={`/bracket/brewery-day/${scorecard.DocumentID}`}>
        <div className={styles.abCardCont}>
          <div className={styles.abCardBody}>
            <p className={styles.brewName}>{props.brewery.Name}</p>
          </div>
        </div>
      </Link>
      <div className={styles.order}>
        <span>Order: </span>
        <input placeholder={props.brewery.Order.toString()} onChange={(e) => props.changeOrder(e.target.value, props.brewery, props.index)}/>
      </div>
    </div>
  );
};

export default Card;
