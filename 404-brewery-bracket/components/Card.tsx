import * as React from "react";
import Link from "next/dist/client/link";
import styles from "../styles/Card.module.scss";
import BreweryDayScorecard from "../pages/api/Firebase/Models/BreweryDayScorecard";

type Props = {
  scorecard: BreweryDayScorecard;
};

const Card: React.FC<Props> = (props) => {
  return (
    <Link href={`/bracket/brewery-day/${props.scorecard.DocumentID}`}>
      <div className={styles.abCardCont}>
        <div className={styles.abCardBody}>
          <h1>{props.scorecard.AssociatedBreweryName}</h1>
          <h2>{props.scorecard.AssociatedBreweryID}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Card;
