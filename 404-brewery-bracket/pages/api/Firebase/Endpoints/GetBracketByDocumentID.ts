import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  getDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../../../../lib/firebase";

import * as collectionConstants from "../CollectionConstants";
import Bracket from "../Models/Bracket";
import Cors from 'cors';
import { runMiddleware } from "../../middleware";

const cors = Cors({
  methods: ['POST', 'HEAD'],
});

/** 
 * @swagger
 *  /api/Firebase/Endpoints/GetBracketByDocumentID:
 *    post:
 *      summary: Get Bracket by ID
 *      description: Get Bracket By DocumentID.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              bracketId: string
 *            example:
 *              bracketId: lTU5ASYAj66leyoHxxW0
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  bracket: 
 *                    $ref: '#/components/schemas/Bracket'
*/
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  runMiddleware(req, res, cors);
  const bracketId = req.body["bracketId"];

  try {
    const collectionRef = collection(
      firestore,
      collectionConstants.Brackets
    );
    const bracketDoc = doc(collectionRef, bracketId);
    const data = await getDoc(bracketDoc);
    const bracket = new Bracket({
      DocumentID: data.id,
      BracketName: data.data().BracketName,
      GroupID: data.data().GroupID,
      Breweries: data.data().Breweries,
    });

    res
      .status(200)
      .json({ bracket: new Bracket(JSON.parse(JSON.stringify(bracket))) });
  } catch (exception) {
    console.log("Could not get bracket by DocumentID.")
    res.status(500).json({ bracket: new Bracket({})});
  }
};

export default handler;
