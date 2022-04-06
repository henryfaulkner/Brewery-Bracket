import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import { Firestore, collection, updateDoc, doc } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import * as collectionConstants from "../CollectionConstants";
import FirebaseExtensions from "../../HelperMethods/FirebaseExtensions";
import BreweryDayScorecard from "../Models/BreweryDayScorecard";

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const scorecardId: string = req.body["DocumentID"];
  const locationScore: string = req.body["locationScore"];
  const environmentScore: string = req.body["environmentScore"];

  const collectionRef = collection(
    firebase[1],
    collectionConstants.BreweryDayScorecard
  );

  const document = doc(collectionRef, scorecardId);

  await updateDoc(document, {
    LocationScore: locationScore,
    EnvironmentScore: environmentScore,
  });

  res.status(200).json({});
};

export default handler;
