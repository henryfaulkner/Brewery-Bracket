import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import { Firestore, collection, addDoc } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import BeerScore from "../Models/BeerScore";
import * as collectionConstants from "../CollectionConstants";
import FirebaseExtensions from "../../HelperMethods/FirebaseExtensions";

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BeerScore>
) => {
  const associatedScorecardId: string = req.body["AssociatedScorecardID"];
  const beerName: string = req.body["BeerName"];
  const beerId: string = req.body["AssociatedBeerID"];
  const score: number = parseInt(req.body["Score"]);
  const isCustom: boolean = eval(req.body["IsCustom"]);

  const beerScore: BeerScore = new BeerScore({
    AssociatedScorecardID: associatedScorecardId,
    AssociatedBeerID: beerId,
    BeerName: beerName,
    Score: score,
    IsCustom: isCustom,
  });

  const data = await addDoc(
    collection(firebase[1], collectionConstants.BeerScore),
    JSON.parse(JSON.stringify(beerScore))
  );

  beerScore.SetDocumentID = data.id;

  res.status(200).json(beerScore);
  console.log(beerName + " added to beer score list.");
};

export default handler;
