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
  return (
    <div className={styles.breweryGrid}>
        {fakeData.map((brewery, key) => {
            return (
                <div className="brewery" id={`brewNum-${key}`}>
                    <h4>{brewery}</h4>
                </div>
            )
        })}
    </div>
  );
};

export default BracketPage;
