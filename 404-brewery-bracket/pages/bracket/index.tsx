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
  let numberOfGames = fakeData.length - 1;
  const numberOfRounds = Math.round(fakeData.length / 2);

  let theBracket;
  // for(let i = numberOfRounds; i > 0; --i) {
  //   let tableElements = numberOfRounds * 2;
  //   let gapCount = (tableElements * 2) - 2;
  //   for(let x = tableElements; x > 0; --x) {
  //     let operation = tableElements % 4;
  //     switch(operation) {
  //       case 0:
  //         theBracket[x][i] = fakeData[numberOfGames]
  //     }
  //   }
  // }

  return (
    <div className={styles.breweryGrid}>
      <table>
        {}
      </table>
    </div>
  );
};

export default BracketPage;
