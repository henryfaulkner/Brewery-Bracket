import * as React from "react";
import Link from "next/dist/client/link";
import styles from "../styles/Card.module.scss";

type Props = {
  name: string;
};

const Card: React.FC<Props> = (props) => {
  return (
    <div className={styles.abCardCont}>
      <div className={styles.abCardBody}>
        <Link href="/bracket/brewery-day">
          <h1>{props.name}</h1>
        </Link>
      </div>
    </div>
  );
};

export default Card;
