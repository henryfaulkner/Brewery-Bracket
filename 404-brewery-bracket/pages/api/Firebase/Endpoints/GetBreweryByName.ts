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
import BreweryObject from "../Models/BreweryObject";

const cors = Cors({
  methods: ['POST', 'HEAD'],
});

/** 
 * @swagger
 *  /api/Firebase/Endpoints/GetBreweryByName:
 *    post:
 *      summary: Get Brewery by Name
 *      description: Get a Brewery object by name.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              breweryName: string
 *            example:
 *              breweryName: Creature Comforts Brewing Company
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BreweryObject'
*/
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BreweryObject>
) => {
  await runMiddleware(req, res, cors);
  const breweryName = req.body["breweryName"];

  const collectionRef = collection(firestore, collectionConstants.CustomBreweries);
  const q1 = await query(
    collectionRef,
    where("Name", "==", breweryName)
  );

  const breweryDocs: QuerySnapshot<DocumentData> = await await getDocs(q1);
  const breweryDoc: QueryDocumentSnapshot<DocumentData> = breweryDocs.docs[0];
  const response: BreweryObject = new BreweryObject({
      DocumentID: breweryDoc.id,
      Name: breweryDoc.data().Name, 
      Description: breweryDoc.data().Description, 
      Short_Description: breweryDoc.data().Short_Description, 
      Url: breweryDoc.data().Url, 
      Facebook_Url: breweryDoc.data().Facebook_Url, 
      Twitter_Url: breweryDoc.data().Twitter_Url, 
      Instagram_Url: breweryDoc.data().Instagram_Url, 
      Address: breweryDoc.data().Address, 
  });

  res.status(200).json(response);
}

export default handler;