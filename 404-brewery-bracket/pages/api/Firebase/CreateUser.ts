import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import FirebaseExtensions from "../HelperMethods/FirebaseExtensions";

type Data = {
  statusMessage: string;
};

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log("in handler");

  const email: string = req.body["email"];
  const password: string = req.body["password"];

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      console.log("User creds: " + user);
      console.log("Email used: " + email);
      console.log("Password used: " + password);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("Error code: " + error.code);
      console.log("Error message: " + error.message);
    });

  console.log("Successfully created user");

  res.status(200).json({ statusMessage: "Successfully created user" });
};

export default handler;
