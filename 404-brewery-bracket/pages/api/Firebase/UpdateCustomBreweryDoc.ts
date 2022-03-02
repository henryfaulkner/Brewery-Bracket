import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import { Firestore, collection, updateDoc, doc } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import FirebaseExtensions from "../HelperMethods/FirebaseExtensions";

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("In handler");
  const customBreweryId: string = req.body["id"];
  const address: string = req.body["address"];
  const url: string = req.body["url"];

  const document = doc(firebase[1], "Custom Breweries", customBreweryId);

  const data = await updateDoc(document, {
    address: address,
    url: url,
  });

  res.status(200).json(data);
  console.log(data);
  console.log("Updated custom breweries document.");
};

export default handler;
