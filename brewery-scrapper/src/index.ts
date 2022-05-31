const fe = require("./FirestoreEndpoints.ts")
const jp = require("./JsonParser.ts")
var fs = require('fs');
var readlineSync = require('readline-sync');
import CustomBrewery from "../Models/CustomBrewery";
import * as FileStoreExtensions from "../config/firebase"

//initialize firestore
FileStoreExtensions.firestore;

let webUrl: string = "";
let webUrlBeerList: string = "";
let requestFileOrDir: string;

(async () => {
  while(true) {
    requestFileOrDir = readlineSync.question('File or Directory: ')

    switch(requestFileOrDir.toLowerCase()){
      case "file": 
        const breweryName: string = readlineSync.question('Enter BreweryName and File Prefix: ');
        await PullAndUploadJson_One(breweryName);
        process.exit();
      case "directory":
        const directoryName: string = readlineSync.question('Enter directory name/path: ');
        await PullAndUploadJson_Many(directoryName);
        process.exit();
    }
  }
})();

async function PullAndUploadJson_Many(directoryName: string) {
  const files = fs.readdirSync(`${directoryName}`);
  console.log(files)
  console.log(files.length)
  for(let i = 0; i < files.length; i++) {
    console.log("cum")
    if(files[i].includes(".json")) {
      console.log(`Processing ${files[i]}`);
      const breweryName = files[i].replace(".json", "");
      console.log(`Uploading ${breweryName}`);
      await PullAndUploadJson_One(breweryName);
    }
  }
}

async function PullAndUploadJson_One(breweryName: string) {
  try {
    // If brewery exists, get it
    // Else, make it and get it
    var brewery: CustomBrewery = await fe.BreweryExists(breweryName)
    if(brewery) {
      console.log(`${breweryName} already exists.`)
      const stillAddJson = readlineSync.question("Still want to add beers? (no to skip): ")
      if(stillAddJson === "no" || stillAddJson === "n") process.exit();
    } else {
      webUrl = readlineSync.question("Web Url: ");
      webUrlBeerList = readlineSync.question("Web Url for the Beer List: ");
      brewery = await fe.AddCustomBrewery(breweryName, webUrl, webUrlBeerList)
    }

    // Pull JSON[] from .json file
    let json = require(`../assets/${breweryName}.json`)
    json = jp.RemoveLinksFromJson(json)
    
    json.map(beerObj => {
      if(fe.BeerExists(beerObj.Name)){
        console.log(`${beerObj.Name} already exists.`)
      }
      else {
        fe.AddBeer(beerObj.Name, brewery)
      }
    })
  } catch (exception) {
    console.log(`An error has occured: ${exception}`)
  }
}