import React, { useEffect, useState } from "react";

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

let currBracket: Bracket;

const BracketCreator = ({ allUsers, initialBreweriesInBracket }) => {
  const router = useRouter();
  const [hasPulledData, setHasPulledData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!hasPulledData && router.isReady) {
        const { bracketid } = router.query;
        await GetCurrentBracket(bracketid);

        setHasPulledData(true);
      }
    };

    console.log("currBracket");
    console.log(currBracket);
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

  return (
    <div>
      <h2>Add Breweries</h2>
      <hr />
      <div className={styles.pageContentContainer}>
        <div className={styles.creationContainer}>
          <div className={styles.addBrewsCont}>
            <div className={styles.knownBreweries}>
              <h3>Add Brewery</h3>
              <BrewerySearchByName
                BracketID={currBracket?.DocumentID ?? ""}
                InitialCardList={initialBreweriesInBracket.map((breweryObj) => {
                  return (
                    <li style={{ listStyleType: "none" }}>
                      <Card breweryObj={breweryObj} />
                    </li>
                  );
                })}
              />
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
          </div>
        </div>
      </div>

      <h2>Add User to This Bracket</h2>
      <hr />
      <div className={styles.pageContentContainer}>
        <div className={styles.addCustomCont}>
          <UserSearchByUsername allUsers={allUsers} bracket={currBracket} />
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

  return {
    props: {
      allUsers,
      initialBreweriesInBracket,
    },
  };
}

export default BracketCreator;
