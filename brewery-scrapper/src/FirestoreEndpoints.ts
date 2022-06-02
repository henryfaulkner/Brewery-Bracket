import CustomBrewery from "../Models/CustomBrewery";
import CustomBeer from "../Models/CustomBeer"
import * as CollectionConstants from "../CollectionConstants";
import { 
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    doc,
    QuerySnapshot,
    DocumentData
  } from "firebase/firestore";

/** 
* Check if a Brewery name exists in Firestore.
* If it does, return it. 
* @param string Brewery name
* @returns CustomBrewery obj if already in database; else, False.
*/
async function BreweryExists(breweryName: string) {
    const collectionRef = collection(getFirestore(), CollectionConstants.CustomBreweries);
    const q = await query(
        collectionRef,
        where("Name", "==", breweryName)
    );
    const docs: QuerySnapshot<DocumentData> = await getDocs(q);

    if(docs.empty) {
        return false
    }

    const doc = docs.docs[0]
    return new CustomBrewery({
        Name: doc.data().Name,
        Description: doc.data().Description,
        Short_Description: doc.data().Short_Description,
        Url: doc.data().Url,
        BeerListUrl: doc.data().BeerListUrl,
        Facebook_Url: doc.data().Facebook_Url,
        Twitter_Url: doc.data().Twitter_Url,
        Instagram_Url: doc.data().Instagram_Url,
        Address: doc.data().Address,
        IsScrapped: true,
        DocumentID: doc.id,
        })
}

/** 
* Add CustomBrewery object to Firestore
* @param string Brewery name
* @param string Website url of brewery
* @param string Website url of brewery's beer list
* @param string Brewery address
* @returns CustomBrewery, fully populated
*/
async function AddCustomBrewery(breweryName: string, webUrl: string, webUrlBeerList: string, address: string) {
    let customBrewery: CustomBrewery = new CustomBrewery({
        Name: breweryName,
        Description: "",
        Short_Description: "",
        Url: webUrl,
        BeerListUrl: webUrlBeerList,
        Facebook_Url: "",
        Twitter_Url: "",
        Instagram_Url: "",
        Address: address,
        IsScrapped: true
    });

    const data = await addDoc(
        collection(getFirestore(), CollectionConstants.CustomBreweries),
        JSON.parse(JSON.stringify(customBrewery))
    );

    customBrewery.SetDocumentID = data.id;
    console.log(breweryName + " added to custom breweries.");
    return customBrewery
}

/** 
* Add CustomBeer object to Firestore
* @param string Beer name
* @return True if beer name is already in database; else, false
*/
async function BeerExists(beerName: string) {
    const collectionRef = collection(getFirestore(), CollectionConstants.CustomBeers);
    const q = await query(
        collectionRef,
        where("Name", "==", beerName)
    );
    
    const docs = await getDocs(q);

    if(docs !== null || docs.empty) return false
    return true
}

// TODO: We can do this in bulk to lower serverload
/** 
* Add CustomBeer object to Firestore
* @param string Beer name
*/
async function AddBeer(json, brewery: CustomBrewery) {
    const beerObj: CustomBeer = new CustomBeer({
        Name: json.Name ?? "",
        Style: json.Style ?? "",
        ABV: json.ABV ?? "",
        IBU: json.IBU ?? "",
        AssociatedBreweryName: brewery.Name,
        AssociatedBreweryID: brewery.DocumentID,
        IsScrapped: true
      })

    await addDoc(
        collection(getFirestore(), CollectionConstants.CustomBeers),
        JSON.parse(JSON.stringify(beerObj))
    );

    console.log(`${beerObj.Name} added to custom brewery, ${beerObj.AssociatedBreweryName}.`);
}

module.exports = {BreweryExists, AddCustomBrewery, BeerExists, AddBeer}