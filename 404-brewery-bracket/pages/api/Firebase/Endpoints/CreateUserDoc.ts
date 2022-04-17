import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Firestore,
  collection,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import * as CollectionConstants from "../CollectionConstants";
import User from "../Models/User";
import FirebaseExtensions from "../../../../helpers/FirebaseExtensions";

type Data = {
  statusMessage: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const email: string = req.body["email"];
  const uid: string = req.body["uid"];
  const username: string = req.body["username"];

  try {
    // Signed in
    const userObj = new User({
      UserID: uid,
      Email: email,
      Username: username,
      Groups: [],
    });
    addDoc(
      collection(getFirestore(), CollectionConstants.Users),
      JSON.parse(JSON.stringify(userObj))
    ).then((res) => {
      userObj.SetDocumentID = res.id;
    });

    console.log("Email used: " + email);
    console.log("Uid: " + uid);
    console.log("Username: " + username);
    console.log("Successfully created user");

    res.status(200).json({ statusMessage: "Successfully call." });
  } catch (exception) {
    console.log("Something went wrong.");

    res.status(500).json({ statusMessage: "Error on call." });
  }
};

export default handler;
