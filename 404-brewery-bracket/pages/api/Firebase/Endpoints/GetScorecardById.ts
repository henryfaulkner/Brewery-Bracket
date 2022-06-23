import { NextApiRequest, NextApiResponse } from "next";
import { collection, getDoc, doc } from "firebase/firestore";
import { firestore } from "../../../../lib/firebase";

import * as collectionConstants from "../CollectionConstants";
import BreweryDayScorecard from "../Models/BreweryDayScorecard";
import Cors from 'cors';
import { runMiddleware } from "../../middleware";

const cors = Cors({
  methods: ['POST', 'HEAD'],
});

/** 
 * @swagger
 *  /api/Firebase/Endpoints/GetScorecardById:
 *    post:
 *      summary: Get Scorecard by ID
 *      description: Get Scorecard By DocumentID.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              DocumentID: string
 *            example:
 *              DocumentID: 9E2xxgPsBpgHJv7c4I6X
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BreweryDayScorecard'
*/
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BreweryDayScorecard>
) => {
  await runMiddleware(req, res, cors);
  const scorecardId: string = req.body["DocumentID"];

  const collectionRef = collection(
    firestore,
    collectionConstants.BreweryDayScorecard
  );
  console.log("scorecard id: " + scorecardId);

  const data = await getDoc(doc(collectionRef, scorecardId));

  const scorecard = new BreweryDayScorecard({
    AssociatedBracketID: data.data().AssociatedBracketID,
    AssociatedBreweryID: data.data().AssociatedBreweryID,
    AssociatedBreweryName: data.data().AssociatedBreweryName,
    AssociatedUserID: data.data().AssociatedUserID,
    AverageBeerScore: data.data().AverageBeerScore,
    EnvironmentScore: data.data().EnvironmentScore,
    LocationScore: data.data().LocationScore,
    DocumentID: data.id,
  });

  res.status(200).json(scorecard);
};

export default handler;
