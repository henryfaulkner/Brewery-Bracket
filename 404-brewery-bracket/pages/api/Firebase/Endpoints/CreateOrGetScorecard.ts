import { NextApiRequest, NextApiResponse } from "next";
import { useUserData } from "../../../../lib/hooks";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  DocumentData,
} from "firebase/firestore";
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
 *  /api/Firebase/Endpoints/CreateOrGetScorecard:
 *    post:
 *      summary: Create or Get Scorecard.
 *      description: If a scorecard exists with a particular User and Brewery pair, return that Scorecard; else, make that Scorecard. This also adds the Scorecard to the current bracket.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              userId: string
 *              breweryID: string
 *              breweryName: string
 *              bracketID: string
 *            example:
 *              userId: bZLTj1h9FBgEe1jj7FsexPPKmtF2
 *              breweryID: Exen63googSMVqRoTC2b
 *              breweryName: Creature Comforts Brewing Company
 *              bracketID: lTU5ASYAj66leyoHxxW0
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
  await runMiddleware(req, res, cors)

  try {
    const userId: string = req.body["userId"];
    //could be bracket Id but I think brewery scorecard for user should persistant
    const breweryID: string = req.body["breweryID"];
    const breweryName: string = req.body["breweryName"];
    const bracketID: string = req.body["bracketID"];

    const collectionRef = collection(
      firestore,
      collectionConstants.BreweryDayScorecard
    );
    const q = await query(
      collectionRef,
      where("AssociatedBreweryID", "==", breweryID),
      where("AssociatedUserID", "==", userId)
    );
    const docs = await getDocs(q);

    let scorecard: BreweryDayScorecard;

    if (docs.empty) {
      console.log("no documents.");

      let data: DocumentData;

      scorecard = new BreweryDayScorecard({
        AssociatedUserID: userId,
        AssociatedBracketID: bracketID,
        AssociatedBreweryID: breweryID,
        AssociatedBreweryName: breweryName,
        AverageBeerScore: 0,
        EnvironmentScore: 0,
        LocationScore: 0,
      });

      data = await addDoc(
        collection(firestore, collectionConstants.BreweryDayScorecard),
        JSON.parse(JSON.stringify(scorecard))
      );

      scorecard.DocumentID = data.id;
    } else {
      console.log("found a document.");

      let response: BreweryDayScorecard[] = [];

      docs.forEach((data) => {
        response.push(
          new BreweryDayScorecard({
            AssociatedUserID: data.data().AssociatedUserID,
            AssociatedBreweryID: data.data().AssociatedBreweryID,
            AssociatedBreweryName: data.data().AssociatedBreweryName,
            AverageBeerScore: data.data().AverageBeerScore,
            EnvironmentScore: data.data().EnvironmentScore,
            LocationScore: data.data().LocationScore,
            DocumentID: data.id,
          })
        );
      });

      scorecard = response[0];
    }

    console.log("CreateOrGetScorecard Succeeded.");
    res.status(200).json(scorecard);
  } catch (exception) {
    console.log("CreateOrGetScorecard Failed.");
    res.status(500);
  }
};

export default handler;
