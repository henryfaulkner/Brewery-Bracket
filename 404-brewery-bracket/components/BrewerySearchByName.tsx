import React, { useState } from "react";
import styles from "../styles/BrewerySearchByName.module.scss";
import TypeAheadDropdown from "./TypeAheadDropdown";
import BreweryObject from "../pages/api/Firebase/Models/BreweryObject";

type Props = {
  BracketID: string;
  inputReference: any;
  breweriesToBeSearched: BreweryObject[];
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
  const [dropdownState, setDropdownState] = useState({ display: "none" });

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
          <li
            key={key}
            onClick={() => {
              setSearchText(searchResult.name);
              console.log(searchText);
              controlAutocompleteOptions([]);
            }}
          >
            {searchResult.name}
          </li>
        );
      }
    );
  };

  const submitSearch = async (event) => {
    let numApproved: number = 0;
    let inputText: string = event.target.value;
    var breweryList: BreweryObject[] = props.breweriesToBeSearched.filter((brewery) => {
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
        onFocus={() => setDropdownState({ display: "block" })}
        onBlur={() => {
          setTimeout(function () {
            setDropdownState({ display: "none" });
          }, 300);
        }}
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
