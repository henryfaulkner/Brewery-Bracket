import React, { useState, useEffect } from "react";
import styles from "../styles/BrewerySearchByName.module.scss";

const CardList = (props) => {
  console.log(props.breweryCards);
  return (
    /* Use for rating system development;
      Reconfigure with function props in future; */
    <div className={styles.cardPlaceholder}>
      <ul>{props.breweryCards}</ul>
    </div>
  );
};

export default CardList;
