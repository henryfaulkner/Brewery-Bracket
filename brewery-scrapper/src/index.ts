const fe = require("./FirestoreEndpoints.ts");
const jp = require("./JsonParser.ts");
const us = require("./UntappdScrapping.ts");
const gms = require("./GoogleMapsScrapping.ts");
var fs = require('fs');
var readlineSync = require('readline-sync');
import CustomBrewery from "../Models/CustomBrewery";
import * as FileStoreExtensions from "../config/firebase"
import BreweryObject from "../Models/BreweryObject";

//initialize firestore
FileStoreExtensions.firestore;

let webUrl: string = "";
let webUrlBeerList: string = "";
let address: string = "";
let requestFileOrDir: string;

main_loop();

async function main_loop() {
  // const breweries: BreweryObject[] = await gms.ScrapGooglePage();
  // jp.WriteBreweriesToJson(breweries, "New-Maryland.json")

  requestFileOrDir = readlineSync.question('File or Directory or Untappd_Single or Untappd_File: ')
  let breweryName: string = "";
  let breweryUntappdUid: string = "";

  switch(requestFileOrDir.toLowerCase()){
    case "file": 
      breweryName = readlineSync.question('Enter BreweryName and File Prefix: ');
      await Local_One(breweryName);
      process.exit();
    case "directory":
      const directoryName: string = readlineSync.question('Enter directory name/path: ');
      await Local_Many(directoryName);
      process.exit();
    case "untappd_single":
      breweryName = readlineSync.question('Enter BreweryName: ');
      breweryUntappdUid = readlineSync.question('Enter BreweryUntappdUid: ');
      const jsons = await us.ScrapPage(breweryUntappdUid);
      await Untappd_One(breweryName, jsons)
      process.exit();
    case "untappd_file":
      const filePath = readlineSync.question('Enter file path: ');
      await Untappd_Many(filePath)
      process.exit();
  }
}

async function Untappd_Many(filePath) {
  let json = require(filePath);
  for(let i = 0; i < json.length; i++){
    try {
      var brewery: CustomBrewery = await fe.BreweryExists(json[i].Name)
      if(brewery) {
        console.log(`${json[i].Name} already exists.`)
        const stillAddJson = readlineSync.question("Still want to add beers? (no to skip): ")
        if(stillAddJson === "no" || stillAddJson === "n") continue;

        //TODO: make function
        // if the json has a untappd url
        if(json[i].UntappdBreweryUid){
          const jsons = await us.ScrapPage(json[i].UntappdBreweryUid)
          jsons.map(async beerObj => {
            if(await fe.BeerExists(beerObj.Name)){
              console.log(`${beerObj.Name} already exists.`)
            }
            else {
              fe.AddBeer(beerObj, brewery)
            }
          })
        }
      } else {
        brewery = await fe.AddCustomBrewery(json[i].Name, json[i].Url, json[i].BeerListUrl, json[i].Address)
      }

      //TODO: make function
      // if the json has a untappd url
      if(json[i].UntappdBreweryUid){
        const jsons = await us.ScrapPage(json[i].UntappdBreweryUid)
        jsons.map(async beerObj => {
          if(await fe.BeerExists(beerObj.Name)){
            console.log(`${beerObj.Name} already exists.`)
          }
          else {
            fe.AddBeer(beerObj, brewery)
          }
        })
      }
    } catch (exception) {
      console.log(`An error has occured: ${exception}`)
    }
  }
}

async function Untappd_One(breweryName: string, jsons){
  try {
    var brewery: CustomBrewery = await fe.BreweryExists(breweryName)
    if(brewery) {
      console.log(`${breweryName} already exists.`)
      const stillAddJson = readlineSync.question("Still want to add beers? (no to skip): ")
      if(stillAddJson === "no" || stillAddJson === "n") process.exit();
    } else {
      webUrl = readlineSync.question("Web Url: ");
      webUrlBeerList = readlineSync.question("Web Url for the Beer List: ");
      address = readlineSync.question("Brewery Address: ");
      brewery = await fe.AddCustomBrewery(breweryName, webUrl, webUrlBeerList, address)
    }
    
    jsons.map(async beerObj => {
      if(await fe.BeerExists(beerObj.Name)){
        console.log(`${beerObj.Name} already exists.`)
      }
      else {
        fe.AddBeer(beerObj, brewery)
      }
    })
  } catch (exception) {
    console.log(`An error has occured: ${exception}`)
  }
}

async function Local_Many(directoryName: string) {
  const files = fs.readdirSync(`${directoryName}`);
  for(let i = 0; i < files.length; i++) {
    if(files[i].includes(".json")) {
      const breweryName = files[i].replace(".json", "");
      await Local_One(breweryName);
    }
  }
}

async function Local_One(breweryName: string) {
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
      address = readlineSync.question("Brewery Address: ");
      brewery = await fe.AddCustomBrewery(breweryName, webUrl, webUrlBeerList, address)
    }

    // Pull JSON[] from .json file
    let json = require(`../assets/${breweryName}.json`)
    json = jp.RemoveLinksFromJson(json)
    
    json.map(async beerObj => {
      if(await fe.BeerExists(beerObj.Name)){
        console.log(`${beerObj.Name} already exists.`)
      }
      else {
        fe.AddBeer(beerObj, brewery)
      }
    })
  } catch (exception) {
    console.log(`An error has occured: ${exception}`)
  }
}