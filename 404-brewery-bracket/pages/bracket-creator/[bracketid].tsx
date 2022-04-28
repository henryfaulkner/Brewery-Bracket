import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";


import styles from "../../styles/BracketCreator.module.scss";
import BrewerySearchByName from "../../components/BrewerySearchByName";
import CustomBreweryTextbox from "../../components/CustomBreweryTextbox";
import UserSearchByUsername from "../../components/UserSearchByUsername";
import Card from "../../components/Card";
import User from "../api/Firebase/Models/User";
import { useRouter } from "next/router";
import { server } from "../../config";
import Bracket from "../api/Firebase/Models/Bracket";
import BreweryObject from "../api/Firebase/Models/BreweryObject";
import GetAllBreweries from "../../helpers/FirebaseExtensions";

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
  const [currentCards, setCurrentCards]: [Array<string>, any] = useState([]);
  const [breweryCardsRendered, setBreweryCardsRendered]: [
    Array<BreweryObject>,
    any
  ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!hasPulledData && router.isReady) {
        const { bracketid } = router.query;
        setBracketID(bracketid);
        await GetCurrentBracket(bracketid);

        setHasPulledData(true);
      }
    };
    fetchData();
  });

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
        .then((res) => {
          currBracket = new Bracket({
            DocumentID: res.bracket.DocumentID,
            BracketName: res.bracket.BracketName,
            GroupID: res.bracket.GroupID,
          });
        });
    } catch (exception) {
      return null;
    }
  };

  const addBrewery = async (e) => {
    if (input_addBrewery.current != null) {
      let inputValue = input_addBrewery.current.value;
      let breweryId = input_addBrewery.current.dataset.currentBreweryId;
      setCurrentCards([...currentCards, [inputValue, breweryId]]);

      // console.log(currentCards);
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

                <button className={styles.btn} onClick={(e) => addBrewery(e)}>
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

          <div className={styles.verticalDividerDiv}></div>
          <div className={styles.currentBreweries}>
            <h3>The Current Competition</h3>
            <div className={styles.currentBreweriesCards}>
              {currentCards.map((breweryInformation, key) => {
                return (
                  <Card
                    key={key}
                    breweryName={breweryInformation[0]}
                    breweryId={breweryInformation[1]}
                    bracketID={bracketID}
                  />
                );
              })}
            </div>
          </div>
        </div>
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
  console.log("getStaticProps allUsers:");
  console.log(allUsers);

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
      console.log("res");
      console.log(typeof res.breweries);
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
