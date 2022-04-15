import { NextApiRequest, NextApiResponse } from "next";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import BeerScore from "../Models/BeerScore";
import * as collectionConstants from "../CollectionConstants";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BeerScore[]>
) => {
  const associatedScorecardId: string = req.body["AssociatedScorecardID"];

  const collectionRef = collection(getFirestore(), collectionConstants.BeerScore);
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
