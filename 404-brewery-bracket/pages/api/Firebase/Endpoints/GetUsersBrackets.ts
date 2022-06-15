import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  where,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";
import { firestore } from "../../../../lib/firebase";
import Bracket from "../Models/Bracket";
import Cors from 'cors';
import { runMiddleware } from "../../middleware";

const cors = Cors({
  methods: ['POST', 'HEAD'],
});

/** 
 * @swagger
 *  /api/Firebase/Endpoints/GetUsersBrackets:
 *    post:
 *      summary: Get My Brackets
 *      description: Get all the User's Brackets.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              userId: string
 *            example:
 *              userId: hWWNwskdGOnEdq0KIQ3S
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Bracket'
*/
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Bracket[]>
) => {
  await runMiddleware(req, res, cors);
  const userId = req.body["userId"];
  let response: Bracket[] = [];

  const collectionRef = collection(firestore, collectionConstants.Groups);
  const q1 = await query(
    collectionRef,
    where("Users", "array-contains", userId)
  );
  const groupDocs = await getDocs(q1);

  if (!groupDocs.empty) {
    for (const group of groupDocs.docs) {
      const collectionRef = collection(firestore, collectionConstants.Brackets);
      const q2 = await query(collectionRef, where("GroupID", "==", group.id));
      const bracketDocs: QuerySnapshot<DocumentData> = await getDocs(q2);

      for (const bracket of bracketDocs.docs) {
        response.push(
          new Bracket({
            DocumentID: bracket.id,
            BracketName: bracket.data().BracketName,
            GroupID: bracket.data().GroupID,
          })
        );
      }
    }
  }

  res.status(200).json(response);
};

export default handler;
