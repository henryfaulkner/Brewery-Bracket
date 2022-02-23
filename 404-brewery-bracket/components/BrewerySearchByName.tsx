import React, { useState, useEffect } from "react";
import styles from "../styles/BrewerySearchByName.module.scss";
import { stringify } from "querystring";

type BreweryData = {
  name: string;
  id: string;
};

type SearchRequest = {
  typeahead: string;
  limit: number;
};

const searchLimit = 6;
let searchResultsOptions: JSX.Element[] = [];

const BrewerySearchByName = (props) => {
  const [searchText, setSearchText]: [string, any] = useState("");
  const [searchResults, setSearchResults]: [BreweryData[], any] = useState([]);
  const [dropdownStyle, setDropdownStyle] = useState({ display: "none" });

  const typing = (event) => {
    setSearchText(event.target.value);
    controlAutocompleteOptions();
  };

  const controlAutocompleteOptions = () => {
    setDropdownStyle({ display: "none" });

    if (searchText !== "") {
      setDropdownStyle({ display: "block" });
    }

    searchResultsOptions = searchResults.map((searchResult: BreweryData) => {
      return (
        <li className={styles.autocompleteOption}>
          <a onClick={() => updateInputValue(searchResult.name)}>
            {searchResult.name}
          </a>
        </li>
      );
    });
  };

  const updateInputValue = (value) => {
    setSearchText(value);
  };

  const submitSearch = async (event) => {
    //Pull data on component load
    //Convert this into a dictionary lookup
    //cause i hate this :)
    let request: SearchRequest = {
      typeahead: searchText,
      limit: searchLimit,
    };

    await fetch("/api/BeerAPI/GetBreweriesByName", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response: BreweryData[]) => {
        setSearchResults(response);
      });
  };

  return (
    <div className={styles.searchByNameWrapper}>
      <input
        type="text"
        id="searchInput"
        value={searchText}
        placeholder="Brewery Typeahead"
        onChange={(e) => typing(e)}
        onKeyUp={(e) => submitSearch(e)}
      />

      <div className={styles.dropdown} style={dropdownStyle}>
        <ul className={styles.autocompleteOptions}>{searchResultsOptions}</ul>
      </div>
    </div>
  );
};

export default BrewerySearchByName;
