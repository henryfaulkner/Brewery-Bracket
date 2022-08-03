import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteField,
  doc,
  setDoc
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
   *              id: string
   *              address: string
   *            example:
   *              id: Exen63googSMVqRoTC2b
   *              address: 271 W Hancock Ave, Athens, GA 30601
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
        const bracket: Bracket = new Bracket(req.body["bracket"]);

        const collectionRef = collection(
            firestore,
            collectionConstants.Brackets
        );
        const bracketRef = doc(collectionRef, bracket.DocumentID)
        if(bracket.Breweries !== null || bracket.Breweries !== undefined) {
            await setDoc(bracketRef, {
                BracketName: bracket.BracketName,
                GroupID: bracket.GroupID,
                Breweries: JSON.parse(JSON.stringify(bracket.Breweries))
            })
        }

        console.log("Updated bracket's orders.");
        res.status(200).json({status: "Updated bracket orders."});
    } catch(exception) {
        console.log("Failed to change the bracket's orders.");
        res.status(500).json({ status: "Failed to change the bracket's orders." });
    }
}

export default handler;