import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/dist/client/link";
import styles from "../styles/components/CurrentCompetitionCard.module.scss";
import { UserContext } from "../lib/context";
import BreweryDayScorecard from "../pages/api/Firebase/Models/BreweryDayScorecard";
import BreweryObject from "../pages/api/Firebase/Models/BreweryObject";
import DeleteIcon from "./DeleteIcon";

type Props = {
  breweryName: string;
  breweryId: string;
  bracketID: string;
  RemoveBrewery;
};

const Card: React.FC<Props> = (props) => {
  const [scorecard, setScorecard]: [BreweryDayScorecard, any] = useState(
    new BreweryDayScorecard({})
  );
  const [hasPulledData, setHasPulledData] = useState(false);
  const { user, username } = useContext(UserContext);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (hasPulledData === false) {
      createOrGetScorecard(props.breweryId, props.breweryName);

      setHasPulledData(true);
    }
  }, []);

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
          setHasPulledData(true);
        });
    } catch (ex) {
      return null;
    }
  };

  const DeleteScorecard = () => {
    props.RemoveBrewery(props.breweryId);
    const request = {
      bracketId: props.bracketID,
      breweryId: props.breweryId,
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
            <p className={styles.brewName}>{scorecard.AssociatedBreweryName}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
