import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  getDoc,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userUid = req.body["userUid"];
  const groupId = req.body["groupId"];

  try {
    const collectionRef = collection(
      getFirestore(),
      collectionConstants.Groups
    );
    const groupDoc = doc(collectionRef, groupId);
    const data = await getDoc(groupDoc);
    updateDoc(groupDoc, {
      Users: [...data.data().Users, userUid],
    });

    res.status(200).json({ success: "Successful add." });
  } catch (exception) {
    res.status(500).json({ success: "Unsuccessful add." });
  }
};

export default handler;
