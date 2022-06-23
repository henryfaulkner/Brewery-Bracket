import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  updateDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  arrayRemove,
  arrayUnion
} from "firebase/firestore";
import { firestore } from "../../../../lib/firebase";

import * as collectionConstants from "../CollectionConstants";
import Cors from 'cors';
import { runMiddleware } from "../../middleware";
import Bracket from "../Models/Bracket";

const cors = Cors({
  methods: ['PUT', 'HEAD'],
});

/** 
 * @swagger
 *  /api/Firebase/Endpoints/UpdateBracketName:
 *    put:
 *      summary: Update Bracket's Name
 *      description: Update a bracket's name.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              bracketId: string
 *              breweryId: string
 *            example:
 *              bracketId: B6f4QoWLwL9j4qSZEpxH
 *              breweryId: 5gnCpQjt74kpgA1Ke6rY
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
*/
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await runMiddleware(req, res, cors);
        let bracketId = req.body["bracketId"];
        let breweryId = req.body["breweryId"];

        // Get every scorecard with bracketId and breweryId
        const collectionRef = collection(firestore, collectionConstants.BreweryDayScorecard);
        const q1 = await query(
            collectionRef,
            where("AssociatedBracketID", "==", bracketId),
            where("AssociatedBreweryID", "==", breweryId)
        );
        const scorecards = await getDocs(q1);
        
        let TotalAggregateBeerScore: number = 0;
        let TotalEnvironmentScore: number = 0;
        let TotalLocationScore: number = 0;

        // add up scorecards
        scorecards.forEach((scorecard) => {
            TotalAggregateBeerScore = TotalAggregateBeerScore + parseInt(scorecard.data().AverageBeerScore);
            TotalEnvironmentScore = TotalEnvironmentScore + parseInt(scorecard.data().EnvironmentScore);
            TotalLocationScore = TotalLocationScore + parseInt(scorecard.data().LocationScore);
        })

        // get bracket doc
        const bracketCollectionRef = collection(firestore, collectionConstants.Brackets)
        const bracketRef = doc(bracketCollectionRef, bracketId)
        const bracket = await getDoc(bracketRef)

        // find the brewery json
        const breweryArr = bracket.data().Breweries.filter(brewery => {
            return brewery["DocumentID"] === breweryId;
        })
        const brewery = breweryArr[0]

        // remove the brewery json
        await updateDoc(bracketRef, {
            Breweries: arrayRemove(brewery)
        })
        
        // calc aggregate scores
        const arrLen = scorecards.size;
        brewery["AggregateBeerScore"] = TotalAggregateBeerScore / arrLen;
        brewery["AggregateEnvironmentScore"] = TotalEnvironmentScore / arrLen;
        brewery["AggregateLocationScore"] = TotalLocationScore / arrLen;
        brewery["TotalAggregateScore"] = (brewery["AggregateBeerScore"] + brewery["AggregateEnvironmentScore"] + brewery["AggregateLocationScore"]) / 3;

        // add the brewery json with updated values
        await updateDoc(bracketRef, {
            Breweries: arrayUnion(brewery)
        })

        res.status(200).json({});
        console.log("Updated bracket's brewery's scores.");
    } catch(exception) {
        console.log("Failed to updates the bracket's brewery's scores.");
        console.log(exception)
        res.status(500).json({ status: "Failed to updates the bracket's brewery's scores." });
    }
};

export default handler;
