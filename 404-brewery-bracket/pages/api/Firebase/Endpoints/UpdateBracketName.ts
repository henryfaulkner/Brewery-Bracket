import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  updateDoc,
  doc,
  getDoc,
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
        const customBreweryId: string = req.body["id"];
        const name: string = req.body["name"];

        const collectionRef = collection(
            firestore,
            collectionConstants.Brackets
        );

        const documentRef = doc(collectionRef, customBreweryId);

        await updateDoc(documentRef, {
            BracketName: name,
        });
        const document = await getDoc(documentRef);

        const data = new Bracket({
            DocumentID: document.id,
            BracketName: name,
            GroupID: document.data().GroupID
        })

        res.status(200).json(data);
        console.log(data);
        console.log("Updated bracket's name.");
    } catch(exception) {
        console.log("Failed to change the bracket's name.");
        res.status(500).json({ status: "Failed to change the bracket's name." });
    }
};

export default handler;
