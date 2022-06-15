import { NextApiRequest, NextApiResponse } from "next";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import BeerScore from "../Models/BeerScore";
import * as collectionConstants from "../CollectionConstants";
import Cors from 'cors';
import { runMiddleware } from "../../middleware";

const cors = Cors({
  methods: ['POST', 'HEAD'],
});

/** 
 * @swagger
 *  /api/Firebase/Endpoints/GetScorecardBeerScores:
 *    post:
 *      summary: Get Beer Scores on Scorecard
 *      description: Get all BeerScores on a particular Scorecard.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              AssociatedScorecardID: string
 *            example:
 *              AssociatedScorecardID: hWWNwskdGOnEdq0KIQ3S
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/BeerScore'
*/
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BeerScore[]>
) => {
  await runMiddleware(req, res, cors);
  const associatedScorecardId: string = req.body["AssociatedScorecardID"];

  const collectionRef = collection(getFirestore(), collectionConstants.BeerScore);
  const q = await query(
    collectionRef,
    where("AssociatedScorecardID", "==", associatedScorecardId)
  );
  const docs = await getDocs(q);

  let beerScores: BeerScore[] = [];
  docs.forEach((data) => {
    beerScores.push(
      new BeerScore({
        AssociatedScorecardID: data.data().AssociatedScorecardID,
        AssociatedBeerID: data.data().AssociatedBeerID,
        BeerName: data.data().BeerName,
        Score: data.data().Score,
        IsCustom: data.data().IsCustom,
      })
    );
  });

  res.status(200).json(beerScores);
};

export default handler;
