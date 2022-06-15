import { NextApiRequest, NextApiResponse } from "next";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Cors from 'cors';

import BreweryObject from "../Models/BreweryObject";
import * as collectionConstants from "../CollectionConstants";
import { runMiddleware } from "../../middleware";

const cors = Cors({
  methods: ['GET', 'HEAD', 'OPTIONS'],
})

/**
 * @swagger
 * /api/Firebase/Endpoints/GetCustomBreweries:
 *   get:
 *     summary: List Breweries
 *     description: Returns all Brewery documents
 *     responses:
 *       '200':
 *          content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/CustomBeer'
 *          description: Brewery objects list from Firestore
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BreweryObject[]>
) => {
  await runMiddleware(req, res, cors);

  const data = await getDocs(
    collection(getFirestore(), collectionConstants.CustomBreweries)
  );
  let response: BreweryObject[] = [];
  data.forEach((doc) => {
    response.push(
      new BreweryObject({
        Name: doc.data().Name,
        Description: doc.data().Description,
        Short_Description: doc.data().Short_Description,
        Url: doc.data().Url,
        Facebook_Url: doc.data().Facebook_Url,
        Twitter_Url: doc.data().Twitter_Url,
        Instagram_Url: doc.data().Instagram_Url,
        Address: doc.data().Address,
        DocumentID: doc.id,
      })
    );
  });

  res.status(200).json(response);
};

export default handler;
