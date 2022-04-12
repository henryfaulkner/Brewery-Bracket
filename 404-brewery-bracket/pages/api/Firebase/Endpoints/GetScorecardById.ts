import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import { Firestore, collection, getDoc, doc } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import * as collectionConstants from "../CollectionConstants";
import FirebaseExtensions from "../../../../helpers/FirebaseExtensions";
import BreweryDayScorecard from "../Models/BreweryDayScorecard";

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BreweryDayScorecard>
) => {
  const scorecardId: string = req.body["DocumentID"];

  const collectionRef = collection(
    firebase[1],
    collectionConstants.BreweryDayScorecard
  );
  console.log("scorecard id: " + scorecardId);

  const data = await getDoc(doc(collectionRef, scorecardId));

  const scorecard = new BreweryDayScorecard({
    AssociatedUserID: data.data().AssociatedUserID,
    AssociatedBreweryID: data.data().AssociatedBreweryID,
    AssociatedBreweryName: data.data().AssociatedBreweryName,
    AverageBeerScore: data.data().AverageBeerScore,
    EnvironmentScore: data.data().EnvironmentScore,
    LocationScore: data.data().LocationScore,
    DocumentID: data.id,
  });

  res.status(200).json(scorecard);
};

export default handler;
