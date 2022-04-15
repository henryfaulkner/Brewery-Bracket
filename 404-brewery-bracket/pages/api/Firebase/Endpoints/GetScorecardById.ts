import { NextApiRequest, NextApiResponse } from "next";
import { collection, getDoc, doc, getFirestore } from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";
import BreweryDayScorecard from "../Models/BreweryDayScorecard";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BreweryDayScorecard>
) => {
  const scorecardId: string = req.body["DocumentID"];

  const collectionRef = collection(
    getFirestore(),
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
