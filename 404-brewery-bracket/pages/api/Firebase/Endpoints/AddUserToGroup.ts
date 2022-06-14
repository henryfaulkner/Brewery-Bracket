import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  doc,
  getFirestore,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";

/** 
 * @swagger
 *  /api/Firebase/Endpoints/AddUserToGroup:
 *    post:
 *      summary: Add User to Group.
 *      description: Add a user's UID to a groups Users array. Will not add if the user already exists in the group.
 *      requestBody:
 *        content:
 *          application/json:   
 *            schema:     
 *              userUid: string
 *              groupId: string
 *            example:       
 *              userUid: hWWNwskdGOnEdq0KIQ3S
 *              groupId: hWWNwskdGOnEdq0KIQ3S
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success: 
 *                    type: string
*/
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userUid: string = req.body["userUid"];
  const groupId: string = req.body["groupId"];

  try {
    const collectionRef = collection(
      getFirestore(),
      collectionConstants.Groups
    );
      
    const groupRef = doc(collectionRef, groupId);
    updateDoc(groupRef, {
      Users: arrayUnion(userUid)
    })

    console.log("Successful add.");
    res.status(200).json({ success: "Successful add." });
  } catch (exception) {
    console.log("Unsuccessful add.");
    res.status(500).json({ success: "Unsuccessful add." });
  }
};

export default handler;
