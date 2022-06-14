import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

import BreweryObject from "../Models/BreweryObject";
import * as collectionConstants from "../CollectionConstants";

type Status = {
  status: string;
};

/** 
 * @swagger
 *  /api/Firebase/Endpoints/AddBreweryToBracket:
 *    post:
 *      summary: Add Brewery to Bracket
 *      descrition: Adds a Brewery document to a Bracket Document's Breweries list.
 *      requestBody:
 *        content:
 *          application/json:    # Media type
 *            schema:            # Request body contents
 *              bracketId: string
 *              serializedBreweryJson: string
 *            example:           # Child of media type because we use $ref above
 *              # Properties of a referenced object
 *              bracketId: hWWNwskdGOnEdq0KIQ3S
 *              serializedBreweryJson: {"Name":"Creature Comforts Brewing Company","Description":"","Short_Description":"","Url":"http://www.creaturecomfortsbeer.com/","Facebook_Url":"","Twitter_Url":"","Instagram_Url":"","Address":"271 W Hancock Ave, Athens, GA 30601","DocumentID":"Exen63googSMVqRoTC2b"}
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                status: string
*/
const handler = async (req: NextApiRequest, res: NextApiResponse<Status>) => {
  try {
    const bracketId: string = req.body["bracketId"];
    console.log(req.body["serializedBreweryJson"])
    const breweryJson = JSON.parse(req.body["serializedBreweryJson"]);

    const breweryObj = new BreweryObject({
      DocumentID: breweryJson["DocumentID"],
      Name: breweryJson["Name"],
      Description: breweryJson["Description"] ?? "",
      Short_Description: breweryJson["Short_Description"] ?? "",
      Url: breweryJson["Url"] ?? "",
      Facebook_Url: breweryJson["Facebook_Url"] ?? "",
      Twitter_Url: breweryJson["Twitter_Url"] ?? "",
      Instagram_Url: breweryJson["Instagram_Url"] ?? "",
      Address: breweryJson["Address"] ?? "",
    });

    const collectionRef = collection(
      getFirestore(),
      collectionConstants.Brackets
    );
    const docRef = doc(collectionRef, bracketId);
    await getDoc(docRef);
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
