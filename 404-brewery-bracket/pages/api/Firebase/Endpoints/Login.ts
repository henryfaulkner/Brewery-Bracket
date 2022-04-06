import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import { getCookie, setCookies } from "cookies-next";

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
  let idToken;

  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user: User = userCredential.user;
      userData = { User: user };
      console.log("user: " + user);
      idToken = await user.getIdTokenResult();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error code: " + errorCode);
      console.log("error message: " + errorMessage);
    });

  setCookies("auth-token", idToken, { req, res });
  console.log("auth-token: " + getCookie("auth-token", { req, res }));

  return res.status(200).json(userData);
};

export default handler;
