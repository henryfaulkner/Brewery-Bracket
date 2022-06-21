import { NextApiRequest, NextApiResponse } from "next";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../../../lib/firebase";
import Cors from "cors";

import BeerScore from "../Models/BeerScore";
import * as collectionConstants from "../CollectionConstants";
import { runMiddleware } from "../../middleware";

const cors = Cors({
  methods: ['POST', 'HEAD'],
})

/** 
 * @swagger
 *  /api/Firebase/Endpoints/AddBeerScore:
 *    post:
 *      summary: Add BeerScore
 *      description: Adds a beerscore to a scorecard
 *      requestBody:
 *        content:
 *          application/json:   
 *            schema:         
 *              AssociatedScorecardID: string
 *              BeerName: string
 *              AssociatedBeerID: string
 *              Score: integer
 *            example:           
 *              AssociatedScorecardID: 32ztBeeCpfrp3Xe20zAJ
 *              AssociatedBeerID: 6JPddA9DbGjhk46c47iF
 *              BeerName: Tropicalia
 *              Score: 3
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BeerScore'
*/
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BeerScore>
) => {
  runMiddleware(req, res, cors);

  const associatedScorecardId: string = req.body["AssociatedScorecardID"];
  const beerName: string = req.body["BeerName"];
  const beerId: string = req.body["AssociatedBeerID"];
  const score: number = parseInt(req.body["Score"]);
  const isCustom: boolean = eval(req.body["IsCustom"]);

  const beerScore: BeerScore = new BeerScore({
    AssociatedScorecardID: associatedScorecardId,
    AssociatedBeerID: beerId,
    BeerName: beerName,
    Score: score,
  });

  const data = await addDoc(
    collection(firestore, collectionConstants.BeerScore),
    JSON.parse(JSON.stringify(beerScore))
  );

  beerScore.SetDocumentID = data.id;

  res.status(200).json(beerScore);
  console.log(beerName + " added to beer score list.");
};

export default handler;
