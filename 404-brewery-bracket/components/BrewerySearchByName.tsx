import React, { useState, useEffect } from "react";
import styles from "../styles/BrewerySearchByName.module.scss";
import TypeAheadDropdown from "./TypeAheadDropdown";
import BreweryObject from "../pages/api/Firebase/Models/BreweryObject";

type Props = {
  BracketID: string;
  inputReference: any;
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
//refactor: Pull all breweries on page load (getStaticProps)
//refactor: Many similarities to UserSearchByUsername
const BrewerySearchByName = (props: Props) => {
  const [searchText, setSearchText]: [string, any] = useState("");
  //Might be able to be set on page load by getStaticProps
  const [allBreweries, setAllBreweries]: [BreweryObject[], any] = useState([]);
  const [hasPulledData, setHasPulledData] = useState(false);
  const [dropdownState, setDropdownState] = useState({display: "none"});

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
    await submitSearch(event);
  };
  const updateInputValue = (value) => {
    setSearchText(value);
  };

  const controlAutocompleteOptions = async (localSearchResults) => {
    searchResultsOptions = localSearchResults.map(
      (searchResult: BreweryObject, key: number) => {
        return (
          <li key={key}>
            <a
              onClick={() => {
                setSearchText(searchResult.name)
                console.log(searchText)
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

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        id="searchInput"
        value={searchText}
        onChange={(e) => typing(e)}
        autoComplete={"off"}
        onFocus={() => setDropdownState({display: "block"})}
        onBlur={() => setDropdownState({display: "none"})}
        ref={props.inputReference}
      />
      <TypeAheadDropdown
        searchResultsOptions={searchResultsOptions}
        dropdownStyle={dropdownState}
        limit={searchLimit}
      />
    </div>
  );
};

export default BrewerySearchByName;
