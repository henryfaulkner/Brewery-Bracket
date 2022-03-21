import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import FirebaseExtensions from "../../HelperMethods/FirebaseExtensions";

type Data = {
  User: User;
};

const firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const email: string = req.body["email"];
  const password: string = req.body["password"];

  const auth = getAuth();
  var userData: Data;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user: User = userCredential.user;
      userData = { User: user };
      console.log("user: " + user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error code: " + errorCode);
      console.log("error message: " + errorMessage);
    });

  res.status(200).json(userData);
};

export default handler;
