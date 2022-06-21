import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/components/BrewerySearchByName.module.scss";
import User from "../pages/api/Firebase/Models/User";
import TypeAheadDropdown from "./TypeAheadDropdown";
import Bracket from "../pages/api/Firebase/Models/Bracket";

type Props = {
  bracketId: string;
};

const UpdateBracketName = (props: Props) => {
  const [searchText, setSearchText] = useState("");
  
  const RequestNameChange = async (newName) => {
    const request = {
      id: props.bracketId,
      name: newName,
    };
    await fetch("/api/Firebase/Endpoints/UpdateBracketName", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  return (
      <div className={styles.wrapper}>
        <input
          type="text"
          id="searchInput"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          autoComplete={"off"}
        />
        <button
          className={styles.btn}
          onClick={() => {
            RequestNameChange(searchText)
          }}
        >
          Add
        </button>
      </div>
  );
}

export default UpdateBracketName;