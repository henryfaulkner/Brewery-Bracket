import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  query,
  getDocs,
  where,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";
import { firestore } from "../../../../lib/firebase";
import Cors from 'cors';
import { runMiddleware } from "../../middleware";
import CustomBeer from "../Models/CustomBeer";

const cors = Cors({
  methods: ['POST', 'HEAD'],
});

/** 
 * @swagger
 *  /api/Firebase/Endpoints/GetBeerByName:
 *    post:
 *      summary: Get Beer by Name
 *      description: Get a Beer object by name.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              beerName: string
 *            example:
 *              beerName: Tropicalia
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CustomBeer'
*/
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CustomBeer>
) => {
  await runMiddleware(req, res, cors);
  const beerName = req.body["beerName"];

  const collectionRef = collection(firestore, collectionConstants.CustomBeers);
  const q1 = await query(
    collectionRef,
    where("Name", "==", beerName)
  );

  const beerDocs: QuerySnapshot<DocumentData> = await await getDocs(q1);
  const beerDoc: QueryDocumentSnapshot<DocumentData> = beerDocs.docs[0];
  const response: CustomBeer = new CustomBeer({
      DocumentID: beerDoc.id,
      Name: beerDoc.data().Name, 
      Description: beerDoc.data().Description, 
      AssociatedBreweryID: beerDoc.data().AssociatedBreweryID, 
      AssociatedBreweryName: beerDoc.data().AssociatedBreweryName, 
      ABV: beerDoc.data().ABV, 
      IBU: beerDoc.data().IBU, 
      Style: beerDoc.data().Style, 
  });

  res.status(200).json(response);
}

export default handler;