import React, { Component, useEffect, useState } from "react";
import Bracket from "../pages/api/Firebase/Models/Bracket";
import BracketsBreweryObject from "../pages/api/Firebase/Models/BracketsBreweryObject";
import styles from "../styles/components/Bracket.module.scss";
import DraggableBracketColumn from "./DraggableBracketColumn";

type Props = {
  numberOfRounds: number;
  bracket: Bracket;
};

const BracketComponent: React.FC<Props> = ({ numberOfRounds, bracket }: Props) => {
  let arrayOfRounds: number[] = [];
  let arrayOfContestants: BracketsBreweryObject[] = [];
  let [breweries, setBreweries]: [BracketsBreweryObject[], any] = useState(() => {
    // bubble sort -> lowest to highest
    var isSwapped = false;
    let numBreweries = bracket.Breweries.length;
    for(let i = numBreweries; i > 0; i--) {
      isSwapped = false;
      for(var j = ( numBreweries - i -1 ); j > 0; j--) {
        if(bracket.Breweries[j].Order > bracket.Breweries[j-1].Order) {
          var temp = bracket.Breweries[j];
          bracket.Breweries[j] = bracket.Breweries[j - 1];
          bracket.Breweries[j - 1] = temp;
          isSwapped = true;
        }
      }

      if(!isSwapped){
        break;
      }
    }
    return bracket.Breweries
  })

  // Generate last round first
  for (let i = numberOfRounds-1; i >= 0; i--) {
    arrayOfRounds.push(i);
  }

  let contestantFlag: boolean = false;
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
              arrayOfContestants.push(new BracketsBreweryObject({Name: "Free Win"}));
            }
          }

          
        }
        if(key === 0){
          return (
            <DraggableBracketColumn arrayOfContestants={arrayOfContestants} key={key} contestantFlag={contestantFlag}/>
          )
        }
        else{
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
        }
      })}
    </div>
  );
};

export default BracketComponent;