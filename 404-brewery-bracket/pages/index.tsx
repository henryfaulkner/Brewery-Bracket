import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import ActiveBracketCard from "../components/ActiveBracketCard";
import CreateBracketCard from "../components/CreateBracketCard";
import Bracket from "./api/Firebase/Models/Bracket";
import { UserContext } from "../lib/context";

import styles from "../styles/pages/BracketCreator.module.scss";
import DeleteIcon from "../components/DeleteIcon";

const Home = () => {
  const [brackets, setBrackets]: [Bracket[], any] = useState([]);
  const [hasPulledData, setHasPulledData] = useState(false);
  const { user, username } = useContext(UserContext);

  useEffect(() => {
    if (hasPulledData === false) {
      GetAllBrackets();
    }
  }, [user]);

  const SetBracketsAfterACreation = (newBracket: Bracket) => {
    setBrackets([...brackets, newBracket]);
  };

  const GetAllBrackets = async () => {
    try {
      const request = {
        userId: user.uid,
      };

      await fetch("/api/Firebase/Endpoints/GetUsersBrackets", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((res: JSON) => {
          setBrackets(res);
          setHasPulledData(true);
        });
    } catch {
      return null;
    }
  };

  const DeleteBracketFromList = (bracket: Bracket) => {
    setBrackets(brackets.filter(
      (delBracket) => delBracket.DocumentID !== bracket.DocumentID
    ))
  };

  return (
    <div>
      <div>
        <h2>Active Brackets</h2>
        <hr />
        <div className={styles.BracketCreator}>
          <CreateBracketCard
            SetBracketsAfterACreation={SetBracketsAfterACreation}
          />
          {brackets.map((bracket: Bracket, key: number) => {
            return (
              <ActiveBracketCard
                key={key}
                bracket={bracket}
                DeleteBracketFromList={DeleteBracketFromList}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
