import * as React from "react";
import Link from "next/dist/client/link";
import styles from "../styles/Scorecard.module.scss";
import ApiBeerScorecard from "./ApiBeerScorecard";
import CustomBeerScorecard from "./CustomBeerScorecard";
import BreweryDayScorecard from "../../pages/api/Firebase/Models/BreweryDayScorecard";

type Props = {
  Scorecard: BreweryDayScorecard;
  AddBeerScore: (beerName, beerId, beerScore, isCustom?) => Promise<void>;
};

const AddBeerScorecardContainer: React.FC<Props> = (props) => {
  console.log("scorecard: " + JSON.stringify(props.Scorecard));
  return (
    <div>
      <ApiBeerScorecard
        Scorecard={props.Scorecard}
        AddBeerScore={props.AddBeerScore}
      />
      <CustomBeerScorecard AddBeerScore={props.AddBeerScore} />
    </div>
  );
};

export default AddBeerScorecardContainer;
