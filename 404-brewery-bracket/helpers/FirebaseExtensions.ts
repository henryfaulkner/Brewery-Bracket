import {server} from "../config";
import BreweryObject from "../pages/api/Firebase/Models/BreweryObject";

const GetAllBreweries = async () => {
  // Make this promise.all() for performance
  let customBrewries = await GetCustomBreweries();
  let allBreweries: BreweryObject[];
  if(customBrewries != null) {
    allBreweries = customBrewries;
  } else { // both null
    allBreweries = [null];
  }
  return allBreweries;
}

async function GetApiBreweries() {
  let breweries: BreweryObject[];
  //Call API breweries
  const response = await fetch(`${server}/api/BeerAPI/GetAPIBreweries`);
  if(response.ok) {
    breweries = await response.json();
  } else {
    console.log(response);
  }
  return breweries;
}

async function GetCustomBreweries() {
  let breweries: BreweryObject[];
  //Call Firestore breweries
  const response = await fetch(`${server}/api/Firebase/Endpoints/GetCustomBreweries`);
  if(response.ok) {
    breweries = await response.json();
  } else {
    console.log(response);
  }
  return breweries;
}

export default GetAllBreweries;
