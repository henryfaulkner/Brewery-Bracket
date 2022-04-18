import { NextApiRequest, NextApiResponse } from "next";
import { collection, addDoc } from "firebase/firestore";

import * as CollectionConstants from "../CollectionConstants";
import { firestore } from "../../../../lib/firebase";
import Bracket from "../Models/Bracket";
import Group from "../Models/Group";

type Data = {
  bracket: JSON;
};

//Each bracket created will create a group.
//The group will, by default, have one member, the owner/creator.
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const bracketName: string = req.body["BracketName"];
  const userId = req.body["userId"];
  console.log("BracketName: " + bracketName);

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

    console.log(JSON.stringify(bracket));
    res.status(200).json({ bracket: JSON.parse(JSON.stringify(bracket)) });
  } catch (exception) {
    console.log(exception);
    res
      .status(700)
      .json({ bracket: JSON.parse(JSON.stringify({ cum: "cum" })) });
  }
};

export default handler;
