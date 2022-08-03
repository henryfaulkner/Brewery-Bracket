import React, { useState, useRef } from "react";
import Head from "next/head";

import styles from "../../styles/pages/BracketCreator.module.scss";
import BrewerySearchByName from "../../components/BrewerySearchByName";
import CustomBreweryTextbox from "../../components/CustomBreweryTextbox";
import UserSearchByUsername from "../../components/UserSearchByUsername";
import Card from "../../components/CurrentCompetitionCard";
import User from "../api/Firebase/Models/User";
import Router from "next/router";
import { server } from "../../config";
import Bracket from "../api/Firebase/Models/Bracket";
import BreweryObject from "../api/Firebase/Models/BreweryObject";
import GetAllBreweries from "../../helpers/FirebaseExtensions";
import Link from "next/link";
import UpdateBracketName from "../../components/UpdateBracketName";
import BracketsBreweryObject from "../api/Firebase/Models/BracketsBreweryObject";

type Props = {
  allUsers: User[];
  initialBrewriesInBracket: BreweryObject[];
  currBracket: Bracket;
  allBreweries: BreweryObject[];
};

const BracketCreator = (props: Props) => {
  const [bracketID, setBracketID]: [string, any] = useState(props.currBracket.DocumentID);
  const [bracketName, setBracketName]: [string, any] = useState(props.currBracket.BracketName)
  const input_addBrewery = useRef();
  const [breweryCardsRendered, setBreweryCardsRendered]: [Array<BracketsBreweryObject>, any] = useState(props.currBracket.Breweries);

  const AddBrewery = async (e) => {
    if (input_addBrewery.current == null) return;

    // @ts-expect-error because one of us is a dummy and won't listen to my chaining operator
    let inputValue = input_addBrewery?.current?.value;
    // @ts-expect-error
    let breweryId = input_addBrewery?.current?.dataset.currentBreweryId;

    // Check if brewery is already in bracket
    let hasBreweryInBracket: boolean = false;
    breweryCardsRendered?.forEach((card) => {
      if(card.DocumentID.includes(breweryId)) hasBreweryInBracket = true;
    })
    if(hasBreweryInBracket) return;

    if(breweryCardsRendered === undefined) {
      setBreweryCardsRendered([new BracketsBreweryObject({
        Name: inputValue, 
        DocumentID: breweryId,
        Order: 0
      })]);
    } else {
      setBreweryCardsRendered([...breweryCardsRendered, new BracketsBreweryObject({
        Name: inputValue, 
        DocumentID: breweryId,
        Order: breweryCardsRendered.length
      })]);
    }
    
    //GetBreweryByDocumentID
    const request = {
      breweryId: breweryId,
    };
    const res = await (await fetch("/api/Firebase/Endpoints/GetBreweryByDocumentID", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })).json();

    try {
      // Add brewery to bracket
      const innerRequest = {
        bracketId: bracketID,
        serializedBreweryJson: JSON.stringify(res["serializedBreweryJson"])
      } 
      await fetch("/api/Firebase/Endpoints/AddBreweryToBracket", {
        method: "POST",
        body: JSON.stringify(innerRequest),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })       
    } catch(e) {
      console.log("Failed AddBreweryToBracket.")
    }
  };

  const RemoveBrewery = (breweryId) => {
    setBreweryCardsRendered(
      breweryCardsRendered.filter((card) => {
        if(!card.DocumentID.includes(breweryId)) return card;
      })
    );
  }

  // NEED TO FINALIZE CHANGES TO props.currBracket.Breweries AT SOME POINT
  const changeOrder = (newOrder, brewery: BracketsBreweryObject, passedIndex) => {
    // Look for the brewery with the newOrder currently
    // Give that brewery the arg[brewery]'s order
    // Give arg[brewery] the newOrder
    const tempBracket = breweryCardsRendered
    for(let i = 0; i < tempBracket.length; i++) {
      if(tempBracket[i].Order === parseInt(newOrder)) {
        tempBracket[i].Order = brewery.Order;
        tempBracket[passedIndex].Order = parseInt(newOrder);
        //Rerenders component
        setBreweryCardsRendered(tempBracket.slice());
        break;
      }
    }
  }

  const updateBracketOrders = () => {
    let bracket = props.currBracket
    bracket.Breweries = breweryCardsRendered
    const request = {
      bracket: props.currBracket
    }
    console.log("props.currBracket")
    console.log(props.currBracket)
    fetch("/api/Firebase/Endpoints/UpdateBracketOrders", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
  }

  // @ts-ignore
  const MyButton = React.forwardRef(({href}, ref) => {
    return (
      <button onClick={() => {
        console.log(href)
        updateBracketOrders()
        Router.push(href)
      }}>Go to the bracket</button>
    )
  })

  return (
    <div>
      <Head>
        <title>Bracket Creator Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="Description" content="Add breweries to your bracket." />
        <meta name="Keywords" content="Brewery Bracket" />
      </Head>
      <h1>{bracketName}</h1>
      <h2>Add Breweries</h2>
      <hr />
      <div className={styles.pageContentContainer}>
        <div className={styles.creationContainer}>
          <div className={styles.addBrewsCont}>
            <div className={styles.knownBreweries}>
              <h3>Add Brewery</h3>
              <div className={styles.labelButtonPair}>
                <BrewerySearchByName
                  BracketID={props.currBracket?.DocumentID ?? ""}
                  inputReference={input_addBrewery}
                  breweriesToBeSearched={props.allBreweries}
                />

                <button className={styles.btn} onClick={(e) => AddBrewery(e)}>
                  Add
                </button>
              </div>
            </div>
            <div className={styles.addCustomCont}>
              <div className={styles.labelInputPair}>
                <label htmlFor="custom brewery">Custom Brewery</label>
                <CustomBreweryTextbox />
              </div>
            </div>
          </div>

          <div className={styles.dividerDiv}></div>
          <div className={styles.currentBreweries}>
            <h3>The Current Competition</h3>
            <div className={styles.currentBreweriesCards}>
              {breweryCardsRendered?.map((breweryInformation, key) => {
                return (
                  <Card
                    key={key}
                    index={key}
                    brewery={breweryInformation}
                    changeOrder={changeOrder}
                    bracketID={bracketID}
                    RemoveBrewery={RemoveBrewery}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.FIGHT}>
        <Link href={`/bracket/${bracketID}`} passHref>
          <MyButton />
        </Link>
      </div>

      <h2>Add User to This Bracket</h2>
      <hr />
      <div className={styles.pageContentContainer}>
        <div className={styles.addCustomCont}>
          <UserSearchByUsername
            allUsers={props.allUsers}
            bracket={props.currBracket}
          />
        </div>
      </div>

      <h2>Change name of bracket</h2>
      <hr />
      <div className={styles.pageContentContainer}>
        <div className={styles.addCustomCont}>
          <UpdateBracketName
            bracketId={bracketID}
            SetBracketName={setBracketName}
          />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  let allUsers: User[] = [];
  let initialBreweriesInBracket: BreweryObject[] = [];
  initialBreweriesInBracket.push(
    JSON.parse(JSON.stringify(new BreweryObject({})))
  );
  await fetch(`${server}/api/Firebase/Endpoints/GetAllUsers`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res: User[]) => {
      allUsers = res;
    });

  // This gets screwed up by page reloads
  const { bracketid } = context.query;
  const request = { bracketid: bracketid };
  await fetch(`${server}/api/Firebase/Endpoints/GetAllBreweriesInBracket`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then((res) => res.json())
  .then((res) => {
    initialBreweriesInBracket = res.breweries.map((brewery) => {
      return JSON.parse(JSON.stringify(brewery));
    });
  });

  const allBreweries = await GetAllBreweries();

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
      allUsers,
      initialBreweriesInBracket,
      allBreweries,
      currBracket
    },
  };
}

export default BracketCreator;
