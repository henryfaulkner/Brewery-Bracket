import React, { useState, useEffect } from "react";
import styles from "../styles/BrewerySearchByName.module.scss";
import CardList from "./CardList";
import Card from "./Card";
import BreweryDayScorecard from "../pages/api/Firebase/Models/BreweryDayScorecard";

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
    await fetch("/api/Firebase/Endpoints/GetCustomBreweries", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        const documents: BreweryObject[] = res.map((doc) => {
          return {
            id: doc.DocumentID,
            name: doc.Name,
            description: doc.Description,
            short_description: doc.Short_Description,
            url: doc.Url,
            facebook_url: doc.Facebook_Url,
            twitter_url: doc.Twitter_Url,
            instagram_url: doc.Instagram_Url,
            address: doc.Address,
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

  //This is probably not performant
  const submitValueSearch = async (value) => {
    let result: BreweryObject;
    allBreweries.every((brewery) => {
      if (brewery.name === value) {
        result = brewery;
        return false;
      }
      return true;
    });

    return result;
  };

  //ADD CARD STUFF
  const createOrGetScorecard = async (
    breweryId,
    breweryName
  ): Promise<BreweryDayScorecard> => {
    try {
      return await fetch("/api/Firebase/Endpoints/CreateOrGetScorecard", {
        method: "POST",
        body: JSON.stringify({
          breweryId: breweryId,
          breweryName: breweryName,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          const scorecard = new BreweryDayScorecard(res);
          return scorecard;
        });
    } catch (ex) {
      return null;
    }
  };

  const [breweryCards, setBreweryCards] = useState([]);
  const AddBreweryCard = async (breweryName: string) => {
    try {
      const breweryObj = await submitValueSearch(breweryName);
      const scorecard = await createOrGetScorecard(
        breweryObj.id,
        breweryObj.name
      );

      const breweryCard = (
        <li style={{ listStyleType: "none" }}>
          <Card scorecard={scorecard} />
        </li>
      );
      setBreweryCards([...breweryCards, breweryCard]);
    } catch (ex) {
      console.log(`Invalid Brewery: ${ex}`);
    }
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
