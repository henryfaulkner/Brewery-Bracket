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
    const tempBreweries = bracket.Breweries;
    var isSwapped = false;
    let numBreweries = tempBreweries.length;
    for(let i = 0; i < numBreweries; i++) {
      isSwapped = false;
      for(var j = 0; j < (numBreweries - 1); j++) {
        if(tempBreweries[j].Order > tempBreweries[j+1].Order) {
          var temp = tempBreweries[j];
          tempBreweries[j] = tempBreweries[j + 1];
          tempBreweries[j + 1] = temp;
          isSwapped = true;
        }
      }

      if(!isSwapped){
        break;
      }
    }
    return tempBreweries
  })

  // Generate last round first
  for (let i = numberOfRounds-1; i >= 0; i--) {
    arrayOfRounds.push(i);
  }

  let contestantFlag: boolean = false;
  return (
    <div className={styles.bracketContainer}>
      { arrayOfRounds.map((currentRound, key) => {
        let tempBreweries = [];
        if(currentRound === 1) return 

        let numOfContestantPairs = 0;
        if (currentRound != numberOfRounds) {
          if(key > 0) { 
            for (let h = 0; h < currentRound; h++) { 
              for(let i = 0; i < Math.round(breweries.length/2); i++) {
                if(i == 0){
                  if(breweries[0].TotalAggregateScore > breweries[1].TotalAggregateScore) tempBreweries.push(breweries[0]);
                  else tempBreweries.push(breweries[1]);
                  continue;
                }
                if(breweries[(i*2)+1] == undefined){
                  tempBreweries.push(breweries[i*2]);
                  break; // keep i*2
                }
                if(breweries.length == (i*2)+1) {
                  if(breweries[i*2].TotalAggregateScore > breweries[(i*2)+1].TotalAggregateScore) tempBreweries.push(breweries[i*2]);
                  else tempBreweries.push(breweries[(i*2)+1]);
                  break; // keep i*2
                }
                if(breweries[i*2].TotalAggregateScore > breweries[(i*2)+1].TotalAggregateScore) tempBreweries.push(breweries[i*2]);
                else tempBreweries.push(breweries[(i*2)+1]);
              }
            }
          } else {
            tempBreweries = breweries;
          }
          

          // current round contestants are chosen here
          numOfContestantPairs = Math.floor(Math.pow(2, currentRound)/2);
          if(numOfContestantPairs == 0) {
            contestantFlag = true;
          }
          arrayOfContestants = [];

          for (let x = 0; x < numOfContestantPairs; x++) {
            if(tempBreweries.length > x) {
              arrayOfContestants.push(tempBreweries[x]);
            } else {
              arrayOfContestants.push(new BracketsBreweryObject({Name: "Free Win"}));
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
