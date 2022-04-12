import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Firestore, collection, addDoc } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import * as CollectionConstants from "../CollectionConstants";
import Bracket from "../Models/Bracket";
import FirebaseExtensions from "../../HelperMethods/FirebaseExtensions";
import Group from "../Models/Group";

type Data = {
  bracket: JSON;
};

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

//Each bracket created will create a group.
//The group will, by default, have one member, the owner/creator.
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const bracketName: string = req.body["BracketName"];
  console.log("BracketName: " + bracketName);

  let bracket: Bracket;
  const currUser = FirebaseExtensions.GetCurrentUser();
  console.log("currUser: " + currUser);
  const group = new Group({
    Users: [currUser.uid],
  });
  addDoc(
    collection(firebase[1], CollectionConstants.Groups),
    JSON.parse(JSON.stringify(group))
  ).then((res) => {
    group.SetDocumentID = res.id;

    bracket = new Bracket({
      BracketName: bracketName,
      GroupID: group.GetDocumentID,
    });
    addDoc(
      collection(firebase[1], CollectionConstants.Brackets),
      JSON.parse(JSON.stringify(bracket))
    ).then((res) => {
      bracket.SetDocumentID = res.id;
    });
  });

  res.status(200).json({ bracket: JSON.parse(JSON.stringify(bracket)) });
};

export default handler;
