import React, { useState, useEffect } from "react";
import styles from "../../styles/Scorecard.module.scss";

type Props = {};

const CustomBeerScorecard: React.FC<Props> = (props) => {
  const [score, setScore]: [string, any] = useState("");

  const restrictScore = (e) => {
    const validScores = ["1", "2", "3", "4", "5", ""];
    if (e.target.value.length < 2 && validScores.includes(e.target.value)) {
      setScore(e.target.value);
    }
  };

  return (
    <div className={styles.Card}>
      <h2>Custom Beer Scorecard</h2>
      <div>
        <input
          type="text"
          placeholder="Custom Beer"
          className={styles.Dropdown}
        />
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

export default CustomBeerScorecard;
