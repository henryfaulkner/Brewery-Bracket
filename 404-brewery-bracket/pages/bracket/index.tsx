import { useState } from "react";
import Bracket from "../../components/Bracket";
import styles from "../../styles/pages/BreweryGrid.module.scss";

type Props = {
  brewries: Array<string>;
};

const fakeData = [
  "brew1",
  "brew2",
  "brew3",
  "brew4",
  "brew5",
  "brew6",
  "brew7",
  "brew8",
];

const BracketPage = (props: Props) => {
  const [rounds, setNumOfRounds] = useState(null);

  let theBracket;



  return (
    <div className={styles.breweryGrid}>
      <input
            placeholder="Number of Rounds"
            id="round-input"
            className={styles.emailInput}
            onChange={(event) => setNumOfRounds(event.target.value)}
            type="text"
      />

      <Bracket
        numberOfRounds={rounds}
        breweries={fakeData}
      />

    </div>
  );
};

export default BracketPage;
