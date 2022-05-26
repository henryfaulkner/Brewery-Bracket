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
    else {
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
}

async function AddCustomBrewery(breweryName: string, webUrl: string, webUrlBeerList: string) {
    let customBrewery: CustomBrewery = new CustomBrewery({
        Name: breweryName,
        Description: "",
        Short_Description: "",
        Url: webUrl,
        BeerListUrl: webUrlBeerList,
        Facebook_Url: "",
        Twitter_Url: "",
        Instagram_Url: "",
        Address: "",
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

async function BeerExists(beerObj: CustomBeer) {
    return
}

// TODO: This will add duplicates
// TODO: We can do this in bulk to lower serverload
async function AddBeer(beerObj: CustomBeer) {
    await addDoc(
        collection(getFirestore(), CollectionConstants.CustomBeers),
        JSON.parse(JSON.stringify(beerObj))
    );

    console.log(`${beerObj.Name} added to custom brewery, ${beerObj.AssociatedBreweryName}.`);
}

module.exports = {BreweryExists, AddCustomBrewery, BeerExists, AddBeer}