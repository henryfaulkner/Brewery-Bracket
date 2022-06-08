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
 * Add a user's UID to a groups Users array.
 * Will not add if the user already exists in
 * the group.
 *
 * @param {NextApiRequest} res Next API route request
 * @param {NextApiResponse} res Next API route response
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
