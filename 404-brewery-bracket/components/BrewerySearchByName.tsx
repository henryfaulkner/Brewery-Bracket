import React, { useState, useEffect } from "react";
import styles from "../styles/BrewerySearchByName.module.scss";
import CardList from "./CardList";
import Card from "./Card";

type BreweryObject = {
  id: string;
  name: string;
  description: string;
  short_description: string;
  url: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  address: string;
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
  const [allBreweries, setAllBreweries]: [BreweryObject[], any] = useState([]);
  let [searchResults, setSearchResults]: [BreweryObject[], any] = useState([]);
  const [dropdownStyle, setDropdownStyle] = useState({ display: "none" });

  const GetAllBreweries = async (request) => {
    let apiBreweries: BreweryObject[] = [];

    //Call API breweries
    await fetch("/api/BeerAPI/GetAPIBreweries", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response: BreweryObject[]) => {
        apiBreweries = response;
      });

    //Call Firestore breweries
    await fetch("/api/Firebase/GetCustomBreweries", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        const documents: BreweryObject[] = res.map((doc) => {
          return {
            id: doc.id,
            name: doc.name,
            description: doc.description,
            short_description: doc.short_description,
            url: doc.url,
            facebook_url: doc.facebook_url,
            twitter_url: doc.twitter_url,
            instagram_url: doc.instagram_url,
            address: doc.address,
          };
        });
        setAllBreweries([...apiBreweries, ...documents]);
      });
  };

  useEffect(() => {
    if (hasPulledData === false) {
      let request: SearchRequest = {
        typeahead: searchText,
        limit: searchLimit,
      };

      GetAllBreweries(request);

      console.log(allBreweries);
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
      (searchResult: BreweryObject) => {
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
    var breweryList: BreweryObject[] = allBreweries.filter((brewery) => {
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

  //ADD CARD STUFF
  const [breweryCards, setBreweryCards] = useState([]);
  const AddBreweryCard = (brewery: string) => {
    const breweryCard = (
      <li style={{ listStyleType: "none" }}>
        <Card name={brewery} />
      </li>
    );
    setBreweryCards([...breweryCards, breweryCard]);
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
      <button className={styles.btn} onClick={() => AddBreweryCard(searchText)}>
        Add
      </button>

      <div className={styles.dropdown} style={dropdownStyle}>
        <ul className={styles.autocompleteList}>{searchResultsOptions}</ul>
      </div>

      <CardList breweryCards={breweryCards ?? []} />
    </div>
  );
};

export default BrewerySearchByName;
