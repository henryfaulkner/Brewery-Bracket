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

const GetAllBreweries = async () => {
  // Make this promise.all() for performance
  let apiBrewries = await GetApiBreweries();
  let customBrewries = await GetCustomBreweries();
  let allBreweries: BreweryObject[];
  if(apiBrewries != null) {
    allBreweries = apiBrewries.concat(customBrewries);
  }


  return allBreweries;
}

async function GetApiBreweries() {
  let breweries: BreweryObject[];
  //Call API breweries
  fetch("/api/BeerAPI/GetApiBreweries", {
    method: "POST",
    // body: JSON.stringify({}),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((response: BreweryObject[]) => {
      breweries = response;
    });
    return breweries;
}

async function GetCustomBreweries() {
  let breweries: BreweryObject[];
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
      breweries = response;
    });
    return breweries;
}

export default GetAllBreweries;
