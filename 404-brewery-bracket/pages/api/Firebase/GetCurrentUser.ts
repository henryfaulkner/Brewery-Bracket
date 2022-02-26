import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, User } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import FirebaseExtensions from "../HelperMethods/FirebaseExtensions";

type Data = {
  CurrentUser: User;
};

const firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const userData: Data = { CurrentUser: auth.currentUser };
  res.status(200).json(userData);
};

export default handler;