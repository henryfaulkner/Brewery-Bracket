import { useState } from "react";
import { server } from "../../config";

import BracketComponent from "../../components/BracketComponent";
import Bracket from "../api/Firebase/Models/Bracket";
import styles from "../../styles/pages/BreweryGrid.module.scss";
import BreweryObject from "../api/Firebase/Models/BreweryObject";

type Props = {
  currBracket: Bracket;
};

const BracketPage = (props: Props) => {
  const [rounds, setNumOfRounds] = useState(null);

  return (
    <div className={styles.breweryGrid}>
      {/* 2^(n-1) <- rounds to breweries */}
      {/* log2(numBreweries) + 2 <- breweries to rounds ( the + 2 and not + 1 is kinda weird to me*/}
      {console.log(Math.ceil(Math.log2(props.currBracket.Breweries.length) + 1))}
      <BracketComponent
        numberOfRounds={props.currBracket.Breweries.length 
          ? Math.ceil(Math.log2(props.currBracket.Breweries.length) + 2) : 0}
        bracket={props.currBracket}
      />

    </div>
  );
};

export async function getServerSideProps(context) {
  const { bracketid } = context.query;
  let currBracket;
  const request2 = {
    bracketId: bracketid,
  };
  try {
    await fetch(`${server}/api/Firebase/Endpoints/GetBracketByDocumentID`, {
      method: "POST",
      body: JSON.stringify(request2),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes)
        currBracket = new Bracket({
          DocumentID: jsonRes.bracket.DocumentID,
          BracketName: jsonRes.bracket.BracketName,
          GroupID: jsonRes.bracket.GroupID,
          Breweries: jsonRes.bracket.Breweries,
        });
      });
  } catch (exception) {
    console.log("Get curent bracket failed.")
    currBracket = new Bracket({});
  }
  currBracket = JSON.parse(JSON.stringify(currBracket));

  return {
    props: {
      currBracket
    }
  }
}

export default BracketPage;
