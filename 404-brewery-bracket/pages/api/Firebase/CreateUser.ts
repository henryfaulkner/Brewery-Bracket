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
  const email: string = req.body["email"];
  const password: string = req.body["password"];

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

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
