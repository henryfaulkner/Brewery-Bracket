import { NextApiRequest, NextApiResponse } from "next";
import { collection, addDoc, getFirestore } from "firebase/firestore";

import * as CollectionConstants from "../CollectionConstants";
import Bracket from "../Models/Bracket";
import Group from "../Models/Group";

type Data = {
  bracket: JSON;
};



//Each bracket created will create a group.
//The group will, by default, have one member, the owner/creator.
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const bracketName: string = req.body["BracketName"];
  const userId = req.body["userId"]
  console.log("BracketName: " + bracketName);

  let bracket: Bracket;
  const group = new Group({
    Users: [userId],
  });
  addDoc(
    collection(getFirestore(), CollectionConstants.Groups),
    JSON.parse(JSON.stringify(group))
  ).then((res) => {
    group.SetDocumentID = res.id;

    bracket = new Bracket({
      BracketName: bracketName,
      GroupID: group.GetDocumentID,
    });
    addDoc(
      collection(getFirestore(), CollectionConstants.Brackets),
      JSON.parse(JSON.stringify(bracket))
    ).then((res) => {
      bracket.SetDocumentID = res.id;
    });
  });

  res.status(200).json({ bracket: JSON.parse(JSON.stringify(bracket)) });
};

export default handler;
