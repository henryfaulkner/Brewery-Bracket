import { NextApiRequest, NextApiResponse } from "next";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import User from "../Models/User";
import * as collectionConstants from "../CollectionConstants";

const handler = async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
  const data = await getDocs(
    collection(getFirestore(), collectionConstants.Users)
  );
  let response: User[] = [];
  data.forEach((doc) => {
    response.push(
      new User({
        Username: doc.data().Username,
        Email: doc.data().Email,
        UserID: doc.data().UserID,
        Groups: doc.data().Groups,
        DocumentID: doc.id,
      })
    );
  });

  res.status(200).json(response);
};

export default handler;
