import React, { useEffect, useState } from "react";
import ActiveBracketCard from "../components/ActiveBracketCard";
import Bracket from "./api/Firebase/Models/Bracket";

import styles from "../styles/BracketCreator.module.scss";

const Home = () => {
  const [brackets, setBrackets]: [Bracket[], any] = useState([]);
  const [hasPulledData, setHasPulledData] = useState(false);

  useEffect(() => {
    if (hasPulledData === false) {
      GetAllBrackets();

      setHasPulledData(true);
    }
  });

  //will need to implement group id
  const GetAllBrackets = async () => {
    await fetch("/api/Firebase/Endpoints/GetAllBrackets", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((res: JSON) => {
        setBrackets(res);
      });
  };

  const CreateBracket = async () => {
    await fetch("/api/Firebase/Endpoints/CreateBracket", {
      method: "POSt",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((res: JSON) => {
        setBrackets([...brackets, res]);
      });
  };

  return (
    <div>
      <div>
        <h2>Active Brackets</h2>
        <hr />
        <div className={styles.BracketCreator}>
          <ActiveBracketCard override={true} />
          {brackets.map((bracket: Bracket) => {
            return (
              <ActiveBracketCard
                override={false}
                bracketName={bracket.BracketName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
