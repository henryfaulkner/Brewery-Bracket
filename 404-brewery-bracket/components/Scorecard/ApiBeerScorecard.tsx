import React, { useState, useEffect } from "react";
import styles from "../../styles/Scorecard.module.scss";
import BreweryDayScorecard from "../../pages/api/Firebase/Models/BreweryDayScorecard";
import BeerScore from "../../pages/api/Firebase/Models/BeerScore";

type Props = {
  Scorecard: BreweryDayScorecard;
  AddBeerScore: (beerName, beerId, beerScore, IsCustom?) => Promise<void>;
};

type BeerObject = {
  id: string;
  name: string;
};

const ApiBeerScorecard: React.FC<Props> = (props) => {
  const [beerSelection, setBeerSelection]: [BeerObject[], any] = useState([]);
  const [selectedBeer, setSelectedBeer]: [BeerObject, any] = useState();
  const [strScore, setStrScore]: [string, any] = useState("");
  const [hasPulledData, setHasPulledData] = useState(false);

  useEffect(() => {
    if (
      hasPulledData === false &&
      props.Scorecard.AssociatedBreweryID != undefined
    ) {
      getBeerSelection();

      setHasPulledData(true);
    }
  });

  const restrictScore = (e) => {
    const validScores = ["1", "2", "3", "4", "5", ""];
    if (e.target.value.length < 2 && validScores.includes(e.target.value)) {
      setStrScore(e.target.value);
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
        setBeerSelection(response.beers);
      });
  };

  const findSelectedBeer = (beerId) => {
    return beerSelection.find((beer) => beer.id === beerId);
  };

  return (
    <div className={styles.Card}>
      <h2>Api Beer Scorecard</h2>
      <div>
        <select
          className={styles.Dropdown}
          id="dropdown"
          onChange={() => {
            const selectValue: string = (
              document.getElementById("dropdown") as HTMLInputElement
            ).value;
            setSelectedBeer(findSelectedBeer(selectValue));
          }}
        >
          <option value="none" selected disabled hidden>
            Select a Beer
          </option>
          {beerSelection.map((beer) => {
            return <option value={beer.id}>{beer.name}</option>;
          })}
        </select>
        <input
          type="text"
          placeholder="(1-5)"
          className={styles.ScoreBox}
          value={strScore}
          onChange={(e) => restrictScore(e)}
        />
      </div>
      <button
        onClick={() => {
          if (
            selectedBeer !== undefined &&
            selectedBeer.name !== "" &&
            strScore !== ""
          ) {
            props.AddBeerScore(
              selectedBeer.name,
              selectedBeer.id,
              parseInt(strScore)
            );
          }
        }}
      >
        Add Score
      </button>
    </div>
  );
};

export default ApiBeerScorecard;
