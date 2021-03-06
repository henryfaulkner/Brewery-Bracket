import React, { useState, useEffect } from "react";
import Link from "next/dist/client/link";
import styles from "../../styles/components/AdditionalInfoModal.module.scss";
import BreweryDayScorecard from "../../pages/api/Firebase/Models/BreweryDayScorecard";
import BeerScore from "../../pages/api/Firebase/Models/BeerScore";

type Props = {
  showModal: {};
  setShowModal;
  Scorecard: BreweryDayScorecard;
  AggregateBeerScore: number;
  BeerListLength: number;
};

const FinalizeScorecardModal: React.FC<Props> = (props) => {
  const [locValue, setLocValue] = useState(props.Scorecard.LocationScore);
  const [envValue, setEnvValue] = useState(props.Scorecard.EnvironmentScore);

  useEffect(() => {
    setLocValue(props.Scorecard.LocationScore);
    setEnvValue(props.Scorecard.EnvironmentScore);
  }, [props.Scorecard.LocationScore, props.Scorecard.EnvironmentScore]);

  const restrictScore = (e, currScore) => {
    const validScores = ["1", "2", "3", "4", "5", ""];
    if (e.target.value.length < 2 && validScores.includes(e.target.value)) {
      return e.target.value;
    }
    return currScore;
  };

  const UpdateLocEnvAndAggScore = async () => {
    const request = {
      DocumentID: props.Scorecard.DocumentID,
      locationScore: locValue,
      environmentScore: envValue,
      averageBeerScore: props.AggregateBeerScore / props.BeerListLength,
    };
    await fetch("/api/Firebase/Endpoints/UpdateLocEnvAndAggScore", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const request2 = {
      bracketId: props.Scorecard.AssociatedBracketID,
      breweryId: props.Scorecard.AssociatedBreweryID
    }
    console.log("request2")
    console.log(request2)
    fetch("/api/Firebase/Endpoints/UpdateBracketsBrewery", {
      method: "POST",
      body: JSON.stringify(request2),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
  };

  return (
    <div className={styles.modal} style={props.showModal}>
      <div className={styles.modalForm}>
        <h2 className={styles.h2}>
          Finalize {props.Scorecard.AssociatedBreweryName} Scorecard
        </h2>

        <div className={styles.inputRows}>
          <div className={styles.inputRow}>
            <h5 className={styles.h5}>Environment / Vibe Score</h5>
            <input
              type="text"
              placeholder="(1-5)"
              className={styles.input}
              id="address"
              value={envValue}
              onChange={(e) => setEnvValue(restrictScore(e, envValue))}
            />
          </div>
          <div className={styles.inputRow}>
            <h5 className={styles.h5}>Location / Convenience Score</h5>
            <input
              type="text"
              placeholder="(1-5)"
              id="url"
              className={styles.input}
              value={locValue}
              onChange={(e) => setLocValue(restrictScore(e, locValue))}
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.button1}
            onClick={() => props.setShowModal({ display: "none" })}
          >
            Close
          </button>
          <Link href="/">
            <button
              className={styles.button2}
              onClick={() => {
                props.setShowModal({ display: "none" });
                UpdateLocEnvAndAggScore();
              }}
            >
              Finalize
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinalizeScorecardModal;
