import React, { useState, useEffect } from "react";
import styles from "../styles/BrewerySearchByName.module.scss";

type BreweryData = {
  name: string;
  id: string;
};

type SearchResults = {
  results: BreweryData[];
};

type SearchRequest = {
  typeahead: string;
  limit: number;
};

const searchLimit = 30;
let searchResultsOptions: JSX.Element[] = [];
let dropdownDisplay = "none";

const BrewerySearchByName = (props) => {
  const [searchText, setSearchText]: [string, any] = useState("");
  const [searchResults, setSearchResults]: [SearchResults, any] = useState({
    results: [],
  });
  const [dropdownStyle, setDropdownStyle] = useState({ display: "none" });

  const typing = (event) => {
    setSearchText(event.target.value);
    controlAutocompleteOptions();
  };

  const controlAutocompleteOptions = () => {
    setDropdownStyle({ display: "none" });
  };

  const submitSearch = async (event) => {
    if (event.charCode === 13 || event.keyCode === 13) {
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
          console.log("response: " + JSON.stringify(response));

          setSearchResults(response);
          searchResultsOptions = response.map((searchResult: BreweryData) => {
            console.log("name: " + JSON.stringify(searchResult));
            return <option>{searchResult.name}</option>;
          });
        });
    }
  };

  return (
    <div className={styles.searchByNameWrapper}>
      <input
        type="text"
        id="searchInput"
        placeholder="Brewery Typeahead"
        onChange={(e) => typing(e)}
        onKeyUp={(e) => submitSearch(e)}
      />

      <div className={styles.dropdown} style={dropdownStyle}>
        <select className={styles.autocompleteOptions}>
          {searchResultsOptions}
        </select>
      </div>
    </div>
  );
};

export default BrewerySearchByName;
