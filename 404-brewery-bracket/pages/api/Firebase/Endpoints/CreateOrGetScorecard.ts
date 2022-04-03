import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  DocumentData,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import * as collectionConstants from "../CollectionConstants";
import FirebaseExtensions from "../../HelperMethods/FirebaseExtensions";
import BreweryDayScorecard from "../Models/BreweryDayScorecard";

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BreweryDayScorecard>
) => {
  const userId: string = auth.currentUser.uid ?? "";
  //could be bracket Id but I think brewery scorecard for user should persistant
  const breweryId: string = req.body["breweryId"];
  const breweryName: string = req.body["breweryName"];

  const collectionRef = collection(
    firebase[1],
    collectionConstants.BreweryDayScorecard
  );
  const q = await query(
    collectionRef,
    where("AssociatedBreweryID", "==", breweryId),
    where("AssociatedUserID", "==", userId)
  );
  const docs = await getDocs(q);

  let scorecard: BreweryDayScorecard;

  if (docs.empty) {
    console.log("no documents.");

    let data: DocumentData;

    scorecard = new BreweryDayScorecard({
      AssociatedUserID: userId,
      AssociatedBreweryID: breweryId,
      AssociatedBreweryName: breweryName,
      BeerScoreAggregate: 0,
      EnvironmentScore: 0,
      LocationScore: 0,
    });

    data = await addDoc(
      collection(firebase[1], collectionConstants.BreweryDayScorecard),
      JSON.parse(JSON.stringify(scorecard))
    );

    scorecard.DocumentID = data.id;
  } else {
    console.log("found a document.");

    let response: BreweryDayScorecard[] = [];

    docs.forEach((data) => {
      response.push(
        new BreweryDayScorecard({
          AssociatedUserID: data.data().AssociatedUserID,
          AssociatedBreweryID: data.data().AssociatedBreweryID,
          AssociatedBreweryName: data.data().AssociatedBreweryName,
          BeerScoreAggregate: data.data().BeerScoreAggregate,
          EnvironmentScore: data.data().EnvironmentScore,
          LocationScore: data.data().LocationScore,
          DocumentID: data.id,
        })
      );
    });

    scorecard = response[0];
  }

  res.status(200).json(scorecard);
};

export default handler;
