import React, { useState, useEffect } from "react";
import styles from "../styles/BrewerySearchByName.module.scss";

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
let hasPulledData = false;

//bug: if no result is long enough to fill space,
//      the option block is too short
//bug: hover only partially highlights
//bug: takes two letter to kick in autocomplete
const BrewerySearchByName = (props) => {
  const [searchText, setSearchText]: [string, any] = useState("");
  const [allBreweries, setAllBreweries]: [BreweryData[], any] = useState([]);
  let [searchResults, setSearchResults]: [BreweryData[], any] = useState([]);
  const [dropdownStyle, setDropdownStyle] = useState({ display: "none" });

  useEffect(() => {
    if (hasPulledData === false) {
      let request: SearchRequest = {
        typeahead: searchText,
        limit: searchLimit,
      };

      fetch("/api/BeerAPI/GetAllBreweries", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((response: BreweryData[]) => {
          setAllBreweries(response);
        });

      console.log("Brewery data received.");
      hasPulledData = true;
    }

    if (searchText == "") {
      searchResultsOptions = [];
    }
  });

  const typing = async (event) => {
    updateInputValue(event.target.value);
    setSearchResults(await submitSearch(event));
  };

  const controlAutocompleteOptions = async (localSearchResults) => {
    setDropdownStyle({ display: "none" });

    if (searchText !== "") {
      setDropdownStyle({ display: "block" });
    }

    searchResultsOptions = localSearchResults.map(
      (searchResult: BreweryData) => {
        return (
          <li className={styles.autocompleteOption}>
            <a
              onClick={() => {
                updateInputValue(searchResult.name);
                controlAutocompleteOptions([]);
              }}
            >
              {searchResult.name}
            </a>
          </li>
        );
      }
    );
  };

  const updateInputValue = (value) => {
    setSearchText(value);
  };

  const submitSearch = async (event) => {
    let numApproved: number = 0;
    let inputText: string = event.target.value;
    var breweryList: BreweryData[] = allBreweries.filter((brewery) => {
      //TODO: Make higher-order function to replicate this functionality
      //if (numApproved > 20) break;

      //normalize strings
      var breweryNameLower = brewery.name.toLowerCase();
      var typeaheadTextLower = inputText.toLowerCase();

      if (breweryNameLower.startsWith(typeaheadTextLower)) numApproved++;
      return (
        breweryNameLower.startsWith(typeaheadTextLower) &&
        numApproved < searchLimit
      );
    });

    controlAutocompleteOptions(breweryList);

    return breweryList;
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        id="searchInput"
        value={searchText}
        onChange={(e) => typing(e)}
      />

      <div className={styles.dropdown} style={dropdownStyle}>
        <ul className={styles.autocompleteList}>{searchResultsOptions}</ul>
      </div>
    </div>
  );
};

export default BrewerySearchByName;
