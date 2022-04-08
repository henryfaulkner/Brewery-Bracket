import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import BeerScore from "../Models/BeerScore";
import * as collectionConstants from "../CollectionConstants";
import FirebaseExtensions from "../../HelperMethods/FirebaseExtensions";

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BeerScore[]>
) => {
  const associatedScorecardId: string = req.body["AssociatedScorecardID"];

  const collectionRef = collection(firebase[1], collectionConstants.BeerScore);
  const q = await query(
    collectionRef,
    where("AssociatedScorecardID", "==", associatedScorecardId)
  );
  const docs = await getDocs(q);

  let beerScores: BeerScore[] = [];
  docs.forEach((data) => {
    beerScores.push(
      new BeerScore({
        AssociatedScorecardID: data.data().AssociatedScorecardID,
        AssociatedBeerID: data.data().AssociatedBeerID,
        BeerName: data.data().BeerName,
        Score: data.data().Score,
        IsCustom: data.data().IsCustom,
      })
    );
  });

  res.status(200).json(beerScores);
};

export default handler;
