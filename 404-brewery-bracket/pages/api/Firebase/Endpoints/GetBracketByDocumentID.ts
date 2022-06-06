import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  getDoc,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";
import Bracket from "../Models/Bracket";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const bracketId = req.body["bracketId"];

  try {
    const collectionRef = collection(
      getFirestore(),
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
    res.status(500);
  }
};

export default handler;
