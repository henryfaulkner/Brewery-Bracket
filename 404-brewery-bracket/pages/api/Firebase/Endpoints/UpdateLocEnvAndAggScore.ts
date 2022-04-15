import { NextApiRequest, NextApiResponse } from "next";
import { collection, updateDoc, doc, getFirestore } from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const scorecardId: string = req.body["DocumentID"];
  const locationScore: number = req.body["locationScore"];
  const environmentScore: number = req.body["environmentScore"];
  const averageBeerScore: number = req.body["averageBeerScore"];

  const collectionRef = collection(
    getFirestore(),
    collectionConstants.BreweryDayScorecard
  );

  const document = doc(collectionRef, scorecardId);

  await updateDoc(document, {
    LocationScore: locationScore,
    EnvironmentScore: environmentScore,
    AverageBeerScore: averageBeerScore,
  });

  res.status(200).json({});
};

export default handler;
