import React, { Component, useEffect } from "react";
import Bracket from "../pages/api/Firebase/Models/Bracket";
import styles from "../styles/components/Bracket.module.scss";

type Props = {
  numberOfRounds: number;
  bracket: Bracket;
};

const BracketComponent: React.FC<Props> = ({ numberOfRounds, bracket }: Props) => {
  let arrayOfRounds: number[] = [];
  let arrayOfContestants = [];
  // Generate last round first
  for (let i = numberOfRounds-1; i >= 0; i--) {
    arrayOfRounds.push(i);
  }

  let contestantFlag = false;

  const ifNotEven = (key) => {
    if(key !== bracket.Breweries.length-1){
      return <button>{bracket.Breweries[key+1].Name}</button>
    } else if(key === bracket.Breweries.length-1){
      return <button>Placeholder</button>
    }
  }

  return (
    <div className={styles.bracketContainer}>
      {arrayOfRounds.map((currentRound, key) => {
        if(currentRound === 1) return 

        let numOfContestantPairs = 0;
        if (currentRound != numberOfRounds) {
          numOfContestantPairs = Math.floor(Math.pow(2, currentRound) / 2);
          if(numOfContestantPairs == 0) {
            contestantFlag = true;
          }
          arrayOfContestants = [];
          for (let x = 0; x < numOfContestantPairs; x++) {
            arrayOfContestants.push(x);
          }
        }
        console.log("arrayOfContestants.length")
        console.log(arrayOfContestants.length)
        return (
          <div className={styles.roundContainer} key={key}>
            {arrayOfContestants.map((contestantPair, key) => {
              if(key % 2 == 0 && key > bracket.Breweries.length) {
                console.log("cum")
                return (
                  <div className={styles.contestantPairContainer} key={key}>
                    <button>Constestant 1</button>
                    <button>Constestant 2</button>
                  </div>
                );
              } else {
                if(key % 2 == 0) {
                  return (
                    <div className={styles.contestantPairContainer} key={key}>
                      <button>{bracket.Breweries[key].Name}</button>
                      {
                        ifNotEven(key)
                      }
                    </div>
                  );
                }
              }
            })}

            {contestantFlag ? <button>Winner</button> : null}
          </div>
        );
      })}
    </div>
  );
};

export default BracketComponent;
