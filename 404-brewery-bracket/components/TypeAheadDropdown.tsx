import React, { useState } from "react";
import styles from "../styles/TypeAheadDropdown.module.scss";

type Props = {
  searchResultsOptions: JSX.Element[];
  dropdownStyle;
  limit: number;
};

const TypeAheadDropdown = (props: Props) => {
  return (
    <div className={styles.dropdown} style={props.dropdownStyle}>
      <ul className={styles.autocompleteList} style={props.dropdownStyle}>{props.searchResultsOptions}</ul>
    </div>
  );
};

export default TypeAheadDropdown;
