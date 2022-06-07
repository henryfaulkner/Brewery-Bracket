import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";

import styles from "../../styles/pages/BracketCreator.module.scss";
import BrewerySearchByName from "../../components/BrewerySearchByName";
import CustomBreweryTextbox from "../../components/CustomBreweryTextbox";
import UserSearchByUsername from "../../components/UserSearchByUsername";
import Card from "../../components/CurrentCompetitionCard";
import User from "../api/Firebase/Models/User";
import { useRouter } from "next/router";
import { server } from "../../config";
import Bracket from "../api/Firebase/Models/Bracket";
import BreweryObject from "../api/Firebase/Models/BreweryObject";
import GetAllBreweries from "../../helpers/FirebaseExtensions";
import Link from "next/link";

let currBracket: Bracket;

type Props = {
  allUsers: User[];
  initialBrewriesInBracket: BreweryObject[];
  allBreweries: BreweryObject[];
};

const BracketCreator = (props: Props) => {
  const router = useRouter();
  const [bracketID, setBracketID]: [string, any] = useState("");
  const [hasPulledData, setHasPulledData] = useState(false);
  const input_addBrewery = useRef();
  const [breweryCardsRendered, setBreweryCardsRendered]: [Array<string>, any] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { bracketid } = router.query;
      setBracketID(bracketid);
      await GetCurrentBracket(bracketid);
      InitializeBreweryCardsRendered();

      setHasPulledData(true);
    };
    if (!hasPulledData && router.isReady) {
      fetchData();
    }
  });

  //TODO: Put in getServerSideProps
  const GetCurrentBracket = async (bracketId) => {
    const request = {
      bracketId: bracketId,
    };
    try {
      await fetch("/api/Firebase/Endpoints/GetBracketByDocumentID", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          currBracket = new Bracket({
            DocumentID: jsonRes.bracket.DocumentID,
            BracketName: jsonRes.bracket.BracketName,
            GroupID: jsonRes.bracket.GroupID,
            Breweries: jsonRes.bracket.Breweries,
          });
        });
    } catch (exception) {
      return null;
    }
  };

  const AddBrewery = async (e) => {
    if (input_addBrewery.current != null) {
      // @ts-expect-error because one of us is a dummy and won't listen to my chaining operator
      let inputValue = input_addBrewery?.current?.value;
      // @ts-expect-error
      let breweryId = input_addBrewery?.current?.dataset.currentBreweryId;

      // Check if brewery is already in bracket
      let hasBreweryInBracket: boolean = false;
      breweryCardsRendered.forEach((card) => {
        if(card.includes(breweryId)) hasBreweryInBracket = true;
      })
      if(hasBreweryInBracket) return;

      setBreweryCardsRendered([...breweryCardsRendered, [inputValue, breweryId]]);
      //GetBreweryByDocumentID
      const request = {
        breweryId: breweryId,
      };
      fetch("/api/Firebase/Endpoints/GetBreweryByDocumentID", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => res.json())
      .then(jsonRes => {
        // Add brewery to bracket
        const innerRequest = {
          bracketId: bracketID,
          serializedBreweryJson: JSON.stringify(jsonRes["serializedBreweryJson"])
        } 
        return fetch("/api/Firebase/Endpoints/AddBreweryToBracket", {
          method: "POST",
          body: JSON.stringify(innerRequest),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        })
      })
    }
  };

  const RemoveBrewery = (breweryId) => {
    setBreweryCardsRendered(
      breweryCardsRendered.filter((card) => {
        if(!card.includes(breweryId)) return card;
      })
    );
  }

  const InitializeBreweryCardsRendered = () => {
    if(currBracket.Breweries) {
      setBreweryCardsRendered(currBracket.Breweries.map((breweryObj: BreweryObject) => {
        return [breweryObj.Name, breweryObj.DocumentID];
      }))

    }
  };

  return (
    <div>
      <Head>
        <title>Bracket Creator Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="Description" content="Add breweries to your bracket." />
        <meta name="Keywords" content="Brewery Bracket" />
      </Head>
      <h2>Add Breweries</h2>
      <hr />
      <div className={styles.pageContentContainer}>
        <div className={styles.creationContainer}>
          <div className={styles.addBrewsCont}>
            <div className={styles.knownBreweries}>
              <h3>Add Brewery</h3>
              <div className={styles.labelButtonPair}>
                <BrewerySearchByName
                  BracketID={currBracket?.DocumentID ?? ""}
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
              {breweryCardsRendered.map((breweryInformation, key) => {
                return (
                  <Card
                    key={key}
                    breweryName={breweryInformation[0]}
                    breweryId={breweryInformation[1]}
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
        <Link href="/bracket">
        <button>Go to the bracket</button>
        </Link>
      </div>

      <h2>Add User to This Bracket</h2>
      <hr />
      <div className={styles.pageContentContainer}>
        <div className={styles.addCustomCont}>
          <UserSearchByUsername
            allUsers={props.allUsers}
            bracket={currBracket}
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
  return {
    props: {
      allUsers,
      initialBreweriesInBracket,
      allBreweries,
    },
  };
}

export default BracketCreator;
