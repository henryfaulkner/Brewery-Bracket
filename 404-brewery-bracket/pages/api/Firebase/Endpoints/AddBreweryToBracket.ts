import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { firestore } from "../../../../lib/firebase";

import BracketsBreweryObject from "../Models/BracketsBreweryObject";
import * as collectionConstants from "../CollectionConstants";
import Cors from 'cors';
import { runMiddleware } from "../../middleware";

const cors = Cors({
  methods: ['POST', 'HEAD'],
})

type Status = {
  status: string;
};

/** 
 * @swagger
 *  /api/Firebase/Endpoints/AddBreweryToBracket:
 *    post:
 *      summary: Add Brewery to Bracket
 *      description: Adds a Brewery document to a Bracket Document's Breweries list.
 *      requestBody:
 *        content:
 *          application/json:   
 *            schema:      
 *              bracketId: string
 *              serializedBreweryJson: string
 *            example:     
 *              bracketId: 1MdnmknrirwWZcqGf00h
 *              serializedBreweryJson: {"Name":"Creature Comforts Brewing Company","Description":"","Short_Description":"","Url":"http://www.creaturecomfortsbeer.com/","Facebook_Url":"","Twitter_Url":"","Instagram_Url":"","Address":"271 W Hancock Ave, Athens, GA 30601","DocumentID":"Exen63googSMVqRoTC2b"}
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status: 
 *                    type: string
*/
const handler = async (req: NextApiRequest, res: NextApiResponse<Status>) => {
  await runMiddleware(req, res, cors)
  try {
    const bracketId: string = req.body["bracketId"];
    const breweryJson = JSON.parse(req.body["serializedBreweryJson"]);

    const collectionRef = collection(
      firestore,
      collectionConstants.Brackets
    );
    const docRef = doc(collectionRef, bracketId);
    const bracketDoc = await getDoc(docRef);

    const breweryObj = new BracketsBreweryObject({
      DocumentID: breweryJson["DocumentID"],
      Name: breweryJson["Name"],
      Description: breweryJson["Description"] ?? "",
      Short_Description: breweryJson["Short_Description"] ?? "",
      Url: breweryJson["Url"] ?? "",
      Facebook_Url: breweryJson["Facebook_Url"] ?? "",
      Twitter_Url: breweryJson["Twitter_Url"] ?? "",
      Instagram_Url: breweryJson["Instagram_Url"] ?? "",
      Address: breweryJson["Address"] ?? "",
      TotalAggregateScore: 0,
      AggregateBeerScore: 0,
      AggregateEnvironmentScore: 0,
      AggregateLocationScore: 0,
      Order: bracketDoc.data().Breweries?.length ?? 0
    });
    
    updateDoc(docRef, {
      Breweries: arrayUnion(JSON.parse(JSON.stringify(breweryObj))),
    });

    console.log("Succeeded in adding brewery to bracket.");
    res.status(200).json({ status: "Succeeded in adding brewery to bracket." });
  } catch (exception) {
    console.log("Failed to add brewery to bracket.");
    res.status(500).json({ status: "Failed to add brewery." });
  }
};

export default handler;
