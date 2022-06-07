import React, { useState, useEffect } from "react";
import styles from "../../styles/components/Scorecard.module.scss";
import BreweryDayScorecard from "../../pages/api/Firebase/Models/BreweryDayScorecard";
import CustomBeer from "../../pages/api/Firebase/Models/CustomBeer";

type Props = {
  Scorecard: BreweryDayScorecard;
  AddBeerScore: (beerName, beerId, beerScore, IsCustom?) => Promise<void>;
};

const ApiBeerScorecard: React.FC<Props> = (props) => {
  const [beerSelection, setBeerSelection]: [CustomBeer[], any] = useState([]);
  const [selectedBeer, setSelectedBeer]: [CustomBeer, any] = useState();
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

    await fetch("/api/Firebase/Endpoints/GetBeersFromBrewery", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setBeerSelection(response.beers);
      });
  };

  const findSelectedBeer = (beerId) => {
    return beerSelection.find((beer) => beer.DocumentID === beerId);
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
          {beerSelection.map((beer, key: number) => {
            return <option key={key} value={beer.DocumentID}>{beer.Name}</option>;
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
            selectedBeer.Name !== "" &&
            strScore !== ""
          ) {
            props.AddBeerScore(
              selectedBeer.Name,
              selectedBeer.DocumentID,
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
