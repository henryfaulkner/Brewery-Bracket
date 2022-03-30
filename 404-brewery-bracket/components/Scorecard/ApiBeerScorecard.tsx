import React, { useState, useEffect } from "react";
import styles from "../../styles/Scorecard.module.scss";
import BreweryDayScorecard from "../../pages/api/Firebase/Models/BreweryDayScorecard";

type Props = {
  Scorecard: BreweryDayScorecard;
};

type BeerObject = {
  id: string;
  name: string;
};

let hasPulledData = false;

const ApiBeerScorecard: React.FC<Props> = (props) => {
  const [beerSelection, setBeerSelection]: [BeerObject[], any] = useState([]);
  const [score, setScore]: [string, any] = useState("");

  useEffect(() => {
    if (
      hasPulledData === false &&
      props.Scorecard.AssociatedBreweryID != undefined
    ) {
      getBeerSelection();

      hasPulledData = true;
    }
  });

  const restrictScore = (e) => {
    const validScores = ["1", "2", "3", "4", "5", ""];
    if (e.target.value.length < 2 && validScores.includes(e.target.value)) {
      setScore(e.target.value);
    }
  };

  const getBeerSelection = async () => {
    const request = {
      BreweryId: props.Scorecard.AssociatedBreweryID,
    };

    console.log("All Scorecard: " + JSON.stringify(props.Scorecard));
    console.log("brewery id: " + props.Scorecard.AssociatedBreweryID);

    await fetch("/api/BeerAPI/GetAllBeersFromGivenBrewery", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("beer response: " + JSON.stringify(response));
        //response.map(beer => );
        setBeerSelection(response.beers);
      });
  };

  return (
    <div className={styles.Card}>
      <h2>Api Beer Scorecard</h2>
      <div>
        <select className={styles.Dropdown}>
          <option value="none" selected disabled hidden>
            Select a Beer
          </option>
          {beerSelection.map((beer) => {
            return <option value={beer.name}>{beer.name}</option>;
          })}
        </select>
        <input
          type="text"
          placeholder="(1-5)"
          className={styles.ScoreBox}
          value={score}
          onChange={(e) => restrictScore(e)}
        />
      </div>
      <button>Add Score</button>
    </div>
  );
};

export default ApiBeerScorecard;
