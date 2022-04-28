import React, { Component } from "react";
import Link from "next/link";

import styles from "../styles/CardCurrentComp.module.scss";


type Props = {
  breweryName: string
};

const CardCurrentComp: React.FC<Props> = ({ breweryName }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <h4>{breweryName}</h4>
      </div>
    </div>
  );
};

export default CardCurrentComp;
