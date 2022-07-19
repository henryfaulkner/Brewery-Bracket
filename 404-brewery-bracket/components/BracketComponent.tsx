import React, { Component, useEffect, useState } from "react";
import Bracket from "../pages/api/Firebase/Models/Bracket";
import BracketsBreweryObject from "../pages/api/Firebase/Models/BracketsBreweryObject";
import styles from "../styles/components/Bracket.module.scss";

type Props = {
  numberOfRounds: number;
  bracket: Bracket;
};

const BracketComponent: React.FC<Props> = ({ numberOfRounds, bracket }: Props) => {
  let arrayOfRounds: number[] = [];
  let arrayOfContestants = [];
  let [breweries, setBreweries]: [BracketsBreweryObject[], any] = useState(() => {
    // bubble sort -> highest to lowest
    var isSwapped = false;
    let numBreweries = bracket.Breweries.length;
    for(let i = 0; i < numBreweries; i++) {
      isSwapped = false;
      for(var j = 0; j < ( numBreweries - i -1 ); j++) {
        if(bracket.Breweries[j].TotalAggregateScore < bracket.Breweries[j+1].TotalAggregateScore) {
          var temp = bracket.Breweries[j];
          bracket.Breweries[j] = bracket.Breweries[j + 1];
          bracket.Breweries[j+1] = temp;
          isSwapped = true;
        }
      }

      if(!isSwapped){
        break;
      }
    }
    return bracket.Breweries
  })

  const OrderBreweriesByScore = () => {
    
  }
   useState(OrderBreweriesByScore());

  // Generate last round first
  for (let i = numberOfRounds-1; i >= 0; i--) {
    arrayOfRounds.push(i);
  }

  let contestantFlag = false;

  

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
            if(breweries.length > x) {
              arrayOfContestants.push(breweries[x]);
            } else {
              arrayOfContestants.push(new BracketsBreweryObject({Name: "Placeholder"}));
            }
          }

          
        }
        return (
          <div className={styles.roundContainer} key={key}>
            {arrayOfContestants.map((contestant: BracketsBreweryObject, key) => {
              if(key % 2 == 0) {
                return (
                  <div className={styles.contestantPairContainer} key={key}>
                    <button>{contestant.Name}</button>
                    <button>{arrayOfContestants[key+1].Name}</button>
                  </div>
                );
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
