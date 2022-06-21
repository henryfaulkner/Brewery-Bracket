import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../../../../lib/firebase";

import * as collectionConstants from "../CollectionConstants";
import Cors from 'cors';
import { runMiddleware } from "../../middleware";

const cors = Cors({
  methods: ['PUT', 'HEAD'],
});

/** 
 * @swagger
 *  /api/Firebase/Endpoints/UpdateCustomBreweryDoc:
 *    put:
 *      summary: Update Custom Brewery Doc
 *      description: Add an address and/or url to an existing Brewery.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              id: string
 *              address: string
 *              url: string
 *            example:
 *              id: Exen63googSMVqRoTC2b
 *              address: 271 W Hancock Ave, Athens, GA 30601
 *              url: http://www.creaturecomfortsbeer.com/
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
*/
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);
  const customBreweryId: string = req.body["id"];
  const address: string = req.body["address"];
  const url: string = req.body["url"];

  const collectionRef = collection(
    firestore,
    collectionConstants.CustomBreweries
  );

  const document = doc(collectionRef, customBreweryId);

  const data = await updateDoc(document, {
    Address: address,
    Url: url,
  });

  res.status(200).json(data);
  console.log(data);
  console.log("Updated custom breweries document.");
};

export default handler;
