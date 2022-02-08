import { GetBreweriesNamesAndIds } from "../api/BeerAPI/catalog-beer";
import Card from "../../components/Card";
import BracketCard from "../../components/Bracket";
import Header from "../../components/Header";

const Bracket = ({ allBreweriesData }) => {
  var breweryNames = [];

  var breweryCards = allBreweriesData.map((breweryObj) => {
    breweryNames.push(breweryObj.name);
    return <Card name={breweryObj.name} />;
  });

  let brackets = [];

  while (breweryNames.length) {
    let bracketCards = breweryNames.splice(0, 2);
    let card1 = <Card name={bracketCards[0]} />;
    let card2 = <Card name={bracketCards[1]} />;
    // brackets.push(<BracketCard card1={card1} card2={card2} />);
  }

  return (
    <div className="container">
      <Header />
      <div className="bracket">{brackets}</div>
    </div>
  );
};

export async function getStaticProps() {
  // const allBreweriesData = await GetBreweriesNamesAndIds();
  return {
    // props: {
    //   allBreweriesData,
    // },
  };
}

export default Bracket;
