import * as React from "react";
import styles from "../../styles/components/Scorecard.module.scss";
import BeerScore from "../../pages/api/Firebase/Models/BeerScore";
import BreweryDayScorecard from "../../pages/api/Firebase/Models/BreweryDayScorecard";

type Props = {
  BeerScoreList: BeerScore[];
};

const BeerScoreList: React.FC<Props> = (props) => {
  return (
    <div className={styles.List}>
      <h2>Beer Score List</h2>
      {props.BeerScoreList.map((beerScore, key: number) => {
        return (
          <p key={key}>
            {beerScore.BeerName} : {beerScore.Score}
          </p>
        );
      })}
    </div>
  );
};

export default BeerScoreList;
