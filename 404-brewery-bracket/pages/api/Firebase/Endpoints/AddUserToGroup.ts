import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  getFirestore,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userUid: string = req.body["userUid"];
  const groupId: string = req.body["groupId"];

  try {
    const collectionRef = collection(
      getFirestore(),
      collectionConstants.Groups
    );
    const q = query(collectionRef, where("Users", "array-contains", userUid));
    const docs = await getDocs(q);

    if (docs.empty) {
      const groupDoc = doc(collectionRef, groupId);
      const data = await getDoc(groupDoc);
      updateDoc(groupDoc, {
        Users: [...data.data().Users, userUid],
      });

      console.log("Successful add.");
      res.status(200).json({ success: "Successful add." });
    } else {
      console.log("User is already in group.");
      res.status(200).json({ success: "User is already in group." });
    }
  } catch (exception) {
    console.log("Unsuccessful add.");
    res.status(500).json({ success: "Unsuccessful add." });
  }
};

export default handler;
