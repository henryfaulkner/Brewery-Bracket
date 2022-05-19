import styles from "../../styles/BreweryGrid.module.scss";

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
  const numberOfGames = fakeData.length - 1;
  const numberOfRounds = Math.round(fakeData.length / 2);

  for(let i = numberOfRounds; i > 0; --i) {
    let tableElements = numberOfRounds * 2;
    
  }

  return (
    <div className={styles.breweryGrid}>
      <table>
        {}
      </table>
    </div>
  );
};

export default BracketPage;
