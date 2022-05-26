const fi = require("./firestoreInteractor.ts")
const jp = require("./jsonParser.ts")
var readlineSync = require('readline-sync');
import CustomBrewery from "../Models/CustomBrewery";
import CustomBeer from "../Models/CustomBeer";
import * as FileStoreExtensions from "./firebase"

//initialize firestore
FileStoreExtensions.firestore;
 
const breweryName: string = readlineSync.question('Enter BreweryName and File Prefix: ');
const webUrl: string = readlineSync.question("Web Url: ");
const webUrlBeerList: string = readlineSync.question("Web Url for the Beer List: ");

(async () => {
  try {
    // If brewery exists, get it
    // Else, make it and get it
    var brewery: CustomBrewery = await fi.BreweryExists(breweryName)
    if(brewery) {
      console.log(`${breweryName} already exists.`)
    } else {
      brewery = await fi.AddCustomBrewery(breweryName, webUrl, webUrlBeerList)
    }
    console.log(brewery)

    //
    let json = require(`../assets/${breweryName}.json`)
    json = jp.remove_links_from_json(json)
    
    json.map(beerObj => {
      fi.AddBeer(new CustomBeer({
        Name: beerObj.Name, 
        AssociatedBreweryName: brewery.Name,
        AssociatedBreweryID: brewery.DocumentID,
        IsScrapped: true
      }))
    })
  } catch (exception) {
    console.log(`An error has occured: ${exception}`)
  }
})();
