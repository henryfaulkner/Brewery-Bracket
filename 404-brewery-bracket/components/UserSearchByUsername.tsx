import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/BrewerySearchByName.module.scss";
import CardList from "./CardList";
import Card from "./Card";
import Portal from "./Portal";
import BreweryDayScorecard from "../pages/api/Firebase/Models/BreweryDayScorecard";
import { UserContext } from "../lib/context";
import User from "../pages/api/Firebase/Models/User";
import TypeAheadDropdown from "./TypeAheadDropdown";
import Bracket from "../pages/api/Firebase/Models/Bracket";

type SearchRequest = {
  typeahead: string;
  limit: number;
};

type Props = {
  allUsers: User[];
  bracket: Bracket;
};

const searchLimit = 6;
let searchResultsOptions: JSX.Element[] = [];

const UserSearchByUsername = (props) => {
  const [searchText, setSearchText] = useState("");
  const [dropdownStyle, setDropdownStyle] = useState();
  const [searchResults, setSearchResults]: [[], any] = useState([]);
  const [hasPulledData, setHasPulledData]: [boolean, any] = useState(false);

  useEffect(() => {
    if (hasPulledData === false) {
      setHasPulledData(true);
      console.log("currBracket");
      console.log(props.currBracket);
    }

    if (searchText == "") {
      searchResultsOptions = [];
    }
  });

  const typing = async (event) => {
    updateInputValue(event.target.value);
    console.log("allUsers");
    console.log(props.allUsers);
    const reducedAllUsers = props.allUsers.filter((user: User) => {
      console.log("JSON.stringify(user)");
      console.log(JSON.stringify(user));
      return user.Username.startsWith(event.target.value);
    });
    searchResultsOptions = reducedAllUsers.map((searchResult: User) => {
      return (
        <li className={styles.autocompleteOption}>
          <a
            onClick={() => {
              updateInputValue(searchResult.Username);
            }}
          >
            {searchResult.Username}
          </a>
        </li>
      );
    });
  };
  const updateInputValue = (value) => {
    setSearchText(value);
  };

  const inviteUserToGroup = async () => {
    try {
      const userAddition: User = await submitValueSearch(searchText);
      const request = {
        userUid: userAddition.UserID,
        groupId: props.bracket.GroupID,
      };
      await fetch("/api/Firebase/Endpoints/AddUserToGroup", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } catch {
      console.log("Could not find user.");
    }
  };

  //This is probably not performant
  //Will be bad with repeat usernames
  const submitValueSearch = async (value) => {
    let result: User;
    props.allUsers.every((user) => {
      if (user.Username === value) {
        result = user;
        return false;
      }
      return true;
    });

    return result;
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        id="searchInput"
        value={searchText}
        onChange={(e) => typing(e)}
        autoComplete={"off"}
      />
      <button
        className={styles.btn}
        onClick={() => {
          inviteUserToGroup();
        }}
      >
        Add
      </button>
      <TypeAheadDropdown
        searchResultsOptions={searchResultsOptions}
        dropdownStyle={dropdownStyle}
        limit={searchLimit}
      />
    </div>
  );
};

export default UserSearchByUsername;
