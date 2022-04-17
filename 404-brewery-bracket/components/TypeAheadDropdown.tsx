import React, { useState } from "react";
import styles from "../styles/BrewerySearchByName.module.scss";

type Props = {
  searchResultsOptions: JSX.Element[];
  dropdownStyle;
  limit: number;
};

const TypeAheadDropdown = (props: Props) => {
  return (
    <div className={styles.dropdown} style={props.dropdownStyle}>
      <ul className={styles.autocompleteList}>{props.searchResultsOptions}</ul>
    </div>
  );
};

export default TypeAheadDropdown;
