import { NextApiRequest, NextApiResponse } from "next";
import { collection, addDoc } from "firebase/firestore";

import * as CollectionConstants from "../CollectionConstants";
import { firestore } from "../../../../lib/firebase";
import Bracket from "../Models/Bracket";
import Group from "../Models/Group";

type Data = {
  bracket: JSON;
};

/** 
 * @swagger
 *  /api/Firebase/Endpoints/CreateBracket:
 *    post:
 *      summary: Create Bracket.
 *      description: Each bracket created will create a group. The group will, by default, have one member, the owner/creator.
 *      requestBody:
 *        content:
 *          application/json: 
 *            schema:           
 *              BracketName: string
 *              userId: string
 *            example:         
 *              BracketName: Perficient's brewery bracket
 *              userId: hWWNwskdGOnEdq0KIQ3S
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  bracket: 
 *                    type: object
*/
// TODO: why are we returning JSON and not the Bracket object ??
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const bracketName: string = req.body["BracketName"];
  const userId = req.body["userId"];

  let bracket: Bracket;
  const group = new Group({
    Users: [userId],
  });

  try {
    await addDoc(
      collection(firestore, CollectionConstants.Groups),
      JSON.parse(JSON.stringify(group))
    ).then(async (res) => {
      group.SetDocumentID = res.id;

      bracket = new Bracket({
        BracketName: bracketName,
        GroupID: group.GetDocumentID,
      });
      await addDoc(
        collection(firestore, CollectionConstants.Brackets),
        JSON.parse(JSON.stringify(bracket))
      ).then((res) => {});
    });

    res.status(200).json({ bracket: JSON.parse(JSON.stringify(bracket)) });
  } catch (exception) {
    console.log(exception);
    res.status(500).json({ bracket: JSON.parse("{}") });
  }
};

export default handler;
