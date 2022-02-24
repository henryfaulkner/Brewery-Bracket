import React from "react";

import globalStyles from "../../styles/Home.module.scss";
import styles from "../../styles/BrackerCreator.module.scss";
import Header from "../../components/Header";
import BrewerySearchByName from "../../components/BrewerySearchByName";

export default class BracketCreator extends React.Component {
  render() {
    function addCustomBrewery() {}
    return (
      <div>
        <h2>Add Breweries</h2>
        <hr />
        <div className={styles.pageContentContainer}>
          <div className={styles.creationContainer}>
            <div className={styles.addBrewsCont}>
              <div className={styles.knownBreweries}>
                <h3>Add Brewery</h3>

                <BrewerySearchByName />
              </div>
              <div className={styles.addCustomCont}>
                <div className={styles.labelInputPair}>
                  <label htmlFor="custom brewery">Custom Brewery</label>
                  <input id="custom brewery" type="text" autoComplete="name" />
                </div>
                {/* <button onClick={addCustomBrewery()}>Add</button> */}
              </div>
            </div>
            <div className={styles.verticalDividerDiv}></div>
            <div className={styles.currentBreweries}>
              <h3>The Current Competition</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
