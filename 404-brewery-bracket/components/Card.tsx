import React, { useState, useEffect, useContext } from "react";
import Link from "next/dist/client/link";
import styles from "../styles/Card.module.scss";
import { UserContext } from "../lib/context";
import BreweryDayScorecard from "../pages/api/Firebase/Models/BreweryDayScorecard";
import BreweryObject from "../pages/api/Firebase/Models/BreweryObject";

type Props = {
  breweryObj: BreweryObject;
};

const Card: React.FC<Props> = (props) => {
  const [scorecard, setScorecard]: [BreweryDayScorecard, any] = useState(
    new BreweryDayScorecard({})
  );
  const [hasPulledData, setHasPulledData] = useState(false);
  const { user, username } = useContext(UserContext);

  useEffect(() => {
    if (hasPulledData === false) {
      createOrGetScorecard(props.breweryObj.id, props.breweryObj.name);
    }
  }, []);

  const createOrGetScorecard = async (breweryId, breweryName) => {
    try {
      const request = {
        userId: user.uid,
        breweryId: breweryId,
        breweryName: breweryName,
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

  return (
    <Link href={`/bracket/brewery-day/${scorecard.DocumentID}`}>
      <div className={styles.abCardCont}>
        <div className={styles.abCardBody}>
          <h1>{scorecard.AssociatedBreweryName}</h1>
          <h2>{scorecard.AssociatedBreweryID}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Card;
