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
import Cors from 'cors';
import { runMiddleware } from "../../middleware";

const cors = Cors({
  methods: ['PUT', 'HEAD'],
});

type Status = {};

/** 
 * @swagger
 *  /api/Firebase/Endpoints/DeleteBreweryInBracket:
 *    put:
 *      summary: Delete Brewery from Bracket
 *      description: Delete a Brewery from a Bracket.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              bracketID: string
 *              breweryID: string
 *            example:
 *              bracketID: hWWNwskdGOnEdq0KIQ3S
 *              breweryID: hWWNwskdGOnEdq0KIQ3S
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
*/
const handler = async (req: NextApiRequest, res: NextApiResponse<Status>) => {
  await runMiddleware(req, res, cors)

  try {
    const bracketId: string = req.body["bracketId"];
    const breweryId: string = req.body["breweryId"];

    const collectionRef = collection(
      getFirestore(),
      collectionConstants.Brackets
    );
    const docRef = doc(collectionRef, bracketId);
    const docSnapshot = await getDoc(docRef);
    const breweries = docSnapshot.data().Breweries;

    let newBreweryArr: BreweryObject[] = [];
    for(let i = 0; i < breweries.length; i++) {
        if (breweries[i].DocumentID !== breweryId) newBreweryArr.push(breweries[i]);
    }

    updateDoc(docRef, {
        Breweries: newBreweryArr,
    })

    console.log("Succeeded in removing brewery from bracket.");
    res.status(200).json({});
  } catch (exception) {
    console.log("Failed to remove brewery from bracket.");
    res.status(500).json({});
  }
};

export default handler;

