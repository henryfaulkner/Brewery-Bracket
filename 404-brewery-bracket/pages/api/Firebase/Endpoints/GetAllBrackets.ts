import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";
import Bracket from "../Models/Bracket";

const auth = getAuth();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Bracket[]>
) => {
  const collectionRef = collection(getFirestore(), collectionConstants.Brackets);
  const q = await query(collectionRef);
  const docs = await getDocs(q);

  let response: Bracket[] = [];
  if (!docs.empty) {
    docs.forEach((data) => {
      response.push(
        new Bracket({
          DocumentID: data.id,
          BracketName: data.data().BracketName,
          GroupID: data.data().GroupID,
        })
      );
    });
  }

  res.status(200).json(response);
};

export default handler;
