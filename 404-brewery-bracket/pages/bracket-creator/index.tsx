import React from "react";

import styles from "../../styles/BrackerCreator.module.scss";
import BrewerySearchByName from "../../components/BrewerySearchByName";
import CustomBreweryTextbox from "../../components/CustomBreweryTextbox";

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
                  <CustomBreweryTextbox />
                </div>
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
