import React, { useContext, useEffect, useState } from "react";
import ActiveBracketCard from "../components/ActiveBracketCard";
import CreateBracketCard from "../components/CreateBracketCard";
import Bracket from "./api/Firebase/Models/Bracket";
import { UserContext } from "../lib/context";

import styles from "../styles/BracketCreator.module.scss";

const Home = () => {
  const [brackets, setBrackets]: [Bracket[], any] = useState([]);
  const [hasPulledData, setHasPulledData] = useState(false);
  const { user, username } = useContext(UserContext);

  useEffect(() => {
    if (hasPulledData === false) {
      GetAllBrackets();
    }
  });

  const SetBracketsAfterACreation = (newBracket: Bracket) => {
    setBrackets([...brackets, newBracket]);
  };

  const GetAllBrackets = async () => {
    try {
      const request = {
        userId: user.uid,
      };
      console.log("fuck yeah");

      await fetch("/api/Firebase/Endpoints/GetUsersBrackets", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((res: JSON) => {
          console.log("fuck yeah");
          setBrackets(res);
          setHasPulledData(true);
        });
    } catch {
      console.log("fuck");
      return null;
    }
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
          {brackets.map((bracket: Bracket) => {
            return <ActiveBracketCard bracket={bracket} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
