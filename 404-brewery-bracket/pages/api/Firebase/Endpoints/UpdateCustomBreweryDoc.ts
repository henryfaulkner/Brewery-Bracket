import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import {
  Firestore,
  collection,
  updateDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import * as collectionConstants from "../CollectionConstants";
import FirebaseExtensions from "../../HelperMethods/FirebaseExtensions";

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("In handler");
  const customBreweryId: string = req.body["id"];
  const address: string = req.body["address"];
  const url: string = req.body["url"];

  const collectionRef = collection(
    firebase[1],
    collectionConstants.CustomBreweries
  );

  const document = doc(collectionRef, customBreweryId);

  const data = await updateDoc(document, {
    Address: address,
    Url: url,
  });

  res.status(200).json(data);
  console.log(data);
  console.log("Updated custom breweries document.");
};

export default handler;
