import React, { Component } from "react";
import styles from "../styles/components/Bracket.module.scss";

type Props = {
  numberOfRounds: number;
  breweries: any[];
};

const Bracket: React.FC<Props> = ({ numberOfRounds, breweries }) => {
  let arrayOfRounds = [];
  let arrayOfContestants = [];

  // Generate last round first
  for (let i = numberOfRounds-1; i >= 0; i--) {
    arrayOfRounds.push(i);
  }

  let contestantFlag = false;

  return (
    <div className={styles.bracketContainer}>
      {arrayOfRounds.map((currentRound, key) => {
        if (currentRound != numberOfRounds) {
          let numOfContestantPairs = Math.floor(Math.pow(2, currentRound) / 2);
          if(numOfContestantPairs == 0) {
            contestantFlag = true;
          }
          arrayOfContestants = [];
          for (let x = 0; x < numOfContestantPairs; x++) {
            arrayOfContestants.push(x);
          }
        }
        return (
          <div className={styles.roundContainer} key={key}>
            {arrayOfContestants.map((contestantPair, key) => {
              return (
                <div className={styles.contestantPairContainer} key={key}>
                  <button>Constestant 1</button>
                  <button>Constestant 2</button>
                </div>
              );
            })}
            {contestantFlag ? <button>Winner</button> : null}
          </div>
        );
      })}
    </div>
  );
};

export default Bracket;
