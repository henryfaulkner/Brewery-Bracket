import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  QuerySnapshot,
  DocumentData
} from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";
import CustomBeer from "../Models/CustomBeer";
import Cors from 'cors';
import { runMiddleware } from "../../middleware";

const cors = Cors({
  methods: ['POST', 'HEAD'],
});

/** 
 * @swagger
 *  /api/Firebase/Endpoints/GetBeersFromBrewery:
 *    post:
 *      summary: Get Breweries in Bracket
 *      description: Return all Brewery objects in a Bracket document.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              BreweryId: string
 *            example:
 *              BreweryId: 0sC0aVhjNPBjAZUyjGlR
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  beers: 
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/CustomBeer'
*/
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);
  const breweryId = req.body["BreweryId"];

  try {
    const collectionRef = collection(getFirestore(), collectionConstants.CustomBeers);
    const q = await query(
        collectionRef,
        where("AssociatedBreweryID", "==", breweryId)
    );
    const data: QuerySnapshot<DocumentData> = await getDocs(q);

    let response: CustomBeer[] = [];
    
    data.forEach((doc) => {
      response.push(
        new CustomBeer({
          Name: doc.data().Name,
          AssociatedBreweryID: doc.data().AssociatedBreweryID,
          AssociatedBreweryName: doc.data().AssociatedBreweryName,
          ABV: doc.data().ABV,
          IBU: doc.data().IBU,
          Description: doc.data().Description,
          Style: doc.data().Style,
          DocumentID: doc.id,
        })
      );
    });

    res
      .status(200)
      .json({ beers: response });
  } catch (exception) {
    res.status(500);
  }
};

export default handler;
