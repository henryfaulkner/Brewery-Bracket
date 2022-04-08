import * as React from "react";
import Link from "next/dist/client/link";
import styles from "../styles/Scorecard.module.scss";
import ApiBeerScorecard from "./ApiBeerScorecard";
import CustomBeerScorecard from "./CustomBeerScorecard";
import BreweryDayScorecard from "../../pages/api/Firebase/Models/BreweryDayScorecard";

type Props = {
  Scorecard: BreweryDayScorecard;
  AddBeerScore: (
    beerName: string,
    beerId: string,
    beerScore: number,
    isCustom?: boolean
  ) => Promise<void>;
};

const AddBeerScorecardContainer: React.FC<Props> = (props) => {
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
