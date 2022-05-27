const fe = require("./FirestoreEndpoints.ts")
const jp = require("./JsonParser.ts")
var readlineSync = require('readline-sync');
import CustomBrewery from "../Models/CustomBrewery";
import * as FileStoreExtensions from "../config/firebase"

//initialize firestore
FileStoreExtensions.firestore;
 
const breweryName: string = readlineSync.question('Enter BreweryName and File Prefix: ');
let webUrl: string = "";
let webUrlBeerList: string = "";

(async () => {
  try {
    // If brewery exists, get it
    // Else, make it and get it
    var brewery: CustomBrewery = await fe.BreweryExists(breweryName)
    if(brewery) {
      console.log(`${breweryName} already exists.`)
      const stillAddJson = readlineSync.question("Still want to add beers? (no to skip)")
      if(stillAddJson === "no" || stillAddJson === "n") return;
    } else {
      webUrl = readlineSync.question("Web Url: ");
      webUrlBeerList = readlineSync.question("Web Url for the Beer List: ");
      brewery = await fe.AddCustomBrewery(breweryName, webUrl, webUrlBeerList)
    }
    console.log(brewery)

    //
    let json = require(`../assets/${breweryName}.json`)
    json = jp.RemoveLinksFromJson(json)
    
    json.map(beerObj => {
      fe.AddBeer(beerObj.Name, brewery)
    })
  } catch (exception) {
    console.log(`An error has occured: ${exception}`)
  }
})();
