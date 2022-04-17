import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/BrewerySearchByName.module.scss";
import CardList from "./CardList";
import Card from "./Card";
import Portal from "./Portal";
import BreweryDayScorecard from "../pages/api/Firebase/Models/BreweryDayScorecard";
import { UserContext } from "../lib/context";
import { User } from "firebase/auth";
import TypeAheadDropdown from "./TypeAheadDropdown";

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

//bug: if you select an autocomplete,
//      you are blocked from useing the textbox
//bug: if you click out of the textbox,
//      the autocomplete is still visiable
//bug: takes two letter to kick in autocomplete
//refactor: separate dropdown list and textbox
const BrewerySearchByName = (props) => {
  const [searchText, setSearchText]: [string, any] = useState("");
  const [allBreweries, setAllBreweries]: [BreweryObject[], any] = useState([]);
  const [searchResults, setSearchResults]: [BreweryObject[], any] = useState(
    []
  );
  const [dropdownStyle, setDropdownStyle] = useState({ display: "none" });
  const [showModal, setShowModal]: [{}, any] = useState({ display: "none" });
  const [hasPulledData, setHasPulledData] = useState(false);
  const { user, username } = useContext(UserContext);

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
      setHasPulledData(true);
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
      const request = {
        userId: user.uid,
        breweryId: breweryId,
        breweryName: breweryName,
      };

      return await fetch("/api/Firebase/Endpoints/CreateOrGetScorecard", {
        method: "POST",
        body: JSON.stringify(request),
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

  const ChangeShowModal = () => {
    setShowModal(() => {
      if (showModal["display"] === "none") return { display: "" };
      else return { display: "none" };
    });
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
          if (username) {
            AddBreweryCard(searchText);
          } else {
            ChangeShowModal();
          }
        }}
      >
        Add
      </button>
      <Portal
        Type={"RedirectToLoginModal"}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <TypeAheadDropdown
        searchResultsOptions={searchResultsOptions}
        dropdownStyle={dropdownStyle}
        limit={searchLimit}
      />

      <CardList breweryCards={breweryCards ?? []} />
    </div>
  );
};

export default BrewerySearchByName;
