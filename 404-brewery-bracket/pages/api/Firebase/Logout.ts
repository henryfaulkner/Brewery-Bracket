import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, signOut } from "firebase/auth";
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
  signOut(auth)
    .then(() => {
      console.log("Sign out successful.");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error code: " + errorCode);
      console.log("error message: " + errorMessage);
    });
};

export default handler;
