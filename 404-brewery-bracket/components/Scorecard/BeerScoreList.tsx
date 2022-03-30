import * as React from "react";
import Link from "next/dist/client/link";
import styles from "../../styles/Scorecard.module.scss";

type Props = {
  BeerScoreList: JSX.Element[];
};

const BeerScoreList: React.FC<Props> = (props) => {
  return (
    <div className={styles.List}>
      <h2>Beer Score List</h2>
      {props.BeerScoreList}
    </div>
  );
};

export default BeerScoreList;
