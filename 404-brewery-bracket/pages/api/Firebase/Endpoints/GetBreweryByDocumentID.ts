import { NextApiRequest, NextApiResponse } from "next";
import BreweryObject from "../Models/BreweryObject";
import * as CollectionConstants from "../CollectionConstants";
import { 
    getFirestore,
    collection,
    doc,
    getDoc,
  } from "firebase/firestore";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const breweryId = req.body["breweryId"]

        const collectionRef = collection(getFirestore(), CollectionConstants.CustomBreweries);
        const breweryDoc = doc(collectionRef, breweryId);
        const data = await getDoc(breweryDoc);
        const brewery = new BreweryObject({
            Name: data.data().Name,
            Description: data.data().Description,
            Short_Description: data.data().Short_Description,
            Url: data.data().Url,
            BeerListUrl: data.data().BeerListUrl,
            Facebook_Url: data.data().Facebook_Url,
            Twitter_Url: data.data().Twitter_Url,
            Instagram_Url: data.data().Instagram_Url,
            Address: data.data().Address, 
            IsScrapped: true,
            DocumentID: data.id,
            });

        console.log("Succeeded to get brewery.");
        res.status(200).json({serializedBreweryJson: brewery});
    } catch (exception) {
        console.log("Failed to get brewery.");
        res.status(500).json({ status: "Failed to get brewery." });
    }
};

export default handler;