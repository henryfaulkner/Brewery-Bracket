import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Firestore, collection, addDoc } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import * as CollectionConstants from "../CollectionConstants";
import User from "../Models/User";
import FirebaseExtensions from "../../HelperMethods/FirebaseExtensions";

type Data = {
  statusMessage: string;
};

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const email: string = req.body["email"];
  const password: string = req.body["password"];

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userObj = new User({
        UserID: userCredential.user.uid,
        Email: userCredential.user.email,
        Groups: [],
      });
      addDoc(
        collection(firebase[1], CollectionConstants.Users),
        JSON.parse(JSON.stringify(userObj))
      ).then((res) => {
        userObj.SetDocumentID = res.id;
      });

      console.log("User creds: " + user);
      console.log("Email used: " + email);
      console.log("Password used: " + password);
      console.log("Successfully created user");
    })
    .catch((error) => {
      const errorCode: string = error.code;
      const errorMessage: string = error.message;

      console.log("Error code: " + errorCode);
      console.log("Error message: " + errorMessage);
    });

  res.status(200).json({ statusMessage: "Successfully call." });
};

export default handler;
