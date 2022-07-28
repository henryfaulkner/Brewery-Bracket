import React, { Component, useEffect, useState } from "react";
import Bracket from "../pages/api/Firebase/Models/Bracket";
import BracketsBreweryObject from "../pages/api/Firebase/Models/BracketsBreweryObject";
import styles from "../styles/components/Bracket.module.scss";

type Props = {
  key: number;
  arrayOfContestants: BracketsBreweryObject[];
  contestantFlag: boolean;
};

const DraggableBracketColumn: React.FC<Props> = ({ key, arrayOfContestants, contestantFlag }: Props) => {

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

export default DraggableBracketColumn;