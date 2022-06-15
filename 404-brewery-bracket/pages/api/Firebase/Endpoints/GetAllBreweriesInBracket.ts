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

import Bracket from "../Models/Bracket";
import BreweryObject from "../Models/BreweryObject";
import * as collectionConstants from "../CollectionConstants";
import Cors from 'cors';
import { runMiddleware } from "../../middleware";

const cors = Cors({
  methods: ['POST', 'HEAD'],
});

type Status = {
  breweries: BreweryObject[];
};

/** 
 * @swagger
 *  /api/Firebase/Endpoints/GetAllBreweriesInBracket:
 *    post:
 *      summary: Get Breweries in Bracket
 *      description: Return all Brewery objects in a Bracket document.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              bracketID: string
 *            example:
 *              bracketID: hWWNwskdGOnEdq0KIQ3S
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  breweries: 
 *                    type: object
*/
// TODO: why are we returning JSON and not the Bracket object ??
const handler = async (req: NextApiRequest, res: NextApiResponse<Status>) => {
  await runMiddleware(req, res, cors);
  try {
    const bracketId: string = req.body["bracketid"];

    const collectionRef = collection(
      getFirestore(),
      collectionConstants.Brackets
    );
    const docRef = doc(collectionRef, bracketId);
    const docSnapshot = await getDoc(docRef);
    const breweries = docSnapshot.data().Breweries;

    console.log("Succeeded in adding brewery to bracket.");
    res.status(200).json({ breweries: JSON.parse(JSON.stringify(breweries)) });
  } catch (exception) {
    console.log("Failed to add brewery to bracket.");
    res.status(500).json({ breweries: [] });
  }
};

export default handler;
