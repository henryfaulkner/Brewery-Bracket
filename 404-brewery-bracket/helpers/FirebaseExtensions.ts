import { useState } from "react";

type BreweryObject = {
  name: string;
  description: string;
  short_description: string;
  url: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  address: string;
};

function GetAllBreweries(request) {
  var [allBreweries, setAllBreweries]: [BreweryObject[], any] = useState();

  //Call API breweries
  fetch("/api/BeerAPI/GetApiBreweries", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((response: BreweryObject[]) => {
      setAllBreweries(response);
    });

  //Call Firestore breweries
  fetch("/api/Firebase/Endpoints/GetCustomBreweries", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((response: BreweryObject[]) => {
      setAllBreweries([allBreweries, response]);
    });

  return allBreweries;
}

export default {GetAllBreweries};
