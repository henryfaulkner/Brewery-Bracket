const fi = require("./FirestoreInteractor.ts")
const jp = require("./JsonParser.ts")
var readlineSync = require('readline-sync');
import CustomBrewery from "../Models/CustomBrewery";
import CustomBeer from "../Models/CustomBeer";
import * as FileStoreExtensions from "../config/firebase"

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
    json = jp.RemoveLinksFromJson(json)
    
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
