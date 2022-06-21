import { NextApiRequest, NextApiResponse } from "next";
import { collection, updateDoc, doc } from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";

import Cors from 'cors';
import { runMiddleware } from "../../middleware";
import { firestore } from "../../../../lib/firebase";

const cors = Cors({
  methods: ['PUT', 'HEAD'],
});

/** 
 * @swagger
 *  /api/Firebase/Endpoints/UpdateLocEnvAndAggScore:
 *    put:
 *      summary: Update Aggregate Scorecard Score
 *      description: Update the location, environment, and/or aggregate BeerScore on ScoreCard
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              scorecardId: string
 *              locationScore: string
 *              environmentScore: string
 *              averageBeerScore: string
 *            example:
 *              scorecardId: 9E2xxgPsBpgHJv7c4I6X
 *              locationScore: 4
 *              environmentScore: 2
 *              averageBeerScore: 3
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
  const scorecardId: string = req.body["DocumentID"];
  const locationScore: number = req.body["locationScore"];
  const environmentScore: number = req.body["environmentScore"];
  const averageBeerScore: number = req.body["averageBeerScore"];

  const collectionRef = collection(
    firestore,
    collectionConstants.BreweryDayScorecard
  );

  const document = doc(collectionRef, scorecardId);

  await updateDoc(document, {
    LocationScore: locationScore,
    EnvironmentScore: environmentScore,
    AverageBeerScore: averageBeerScore,
  });

  res.status(200).json({});
};

export default handler;
