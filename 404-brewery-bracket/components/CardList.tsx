import React, { useState, useEffect } from "react";
import styles from "../styles/components/BrewerySearchByName.module.scss";

const CardList = (props) => {
  return (
    /* Use for rating system development;
      Restructure with function props in future; */
    <div className={styles.cardPlaceholder}>
      <ul>{props.breweryCards}</ul>
    </div>
  );
};

export default CardList;
