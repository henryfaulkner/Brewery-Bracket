import React, { useEffect, useState } from "react";

import styles from "../../styles/BracketCreator.module.scss";
import BrewerySearchByName from "../../components/BrewerySearchByName";
import CustomBreweryTextbox from "../../components/CustomBreweryTextbox";
import UserSearchByUsername from "../../components/UserSearchByUsername";
import User from "../api/Firebase/Models/User";
import { useRouter } from "next/router";
import { server } from "../../config";
import Bracket from "../api/Firebase/Models/Bracket";

let currBracket: Bracket;

const BracketCreator = ({ allUsers }) => {
  const router = useRouter();
  const [hasPulledData, setHasPulledData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!hasPulledData && router.isReady) {
        const { bracketid } = router.query;
        await GetCurrentBracket(bracketid);
        console.log("b");
        console.log(currBracket);

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
          // console.log("res.bracket");
          // console.log(res.bracket);
          currBracket = new Bracket({
            DocumentID: res.bracket.DocumentID,
            BracketName: res.bracket.BracketName,
            GroupID: res.bracket.GroupID,
          });
        });
    } catch (exception) {
      console.log("fuck");
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
              <BrewerySearchByName />
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

export async function getServerSideProps() {
  let allUsers: User[] = [];
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

  return {
    props: {
      allUsers,
    },
  };
}

export default BracketCreator;
