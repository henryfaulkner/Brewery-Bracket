import { NextApiRequest, NextApiResponse } from "next";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../../../lib/firebase";

import BeerScore from "../Models/BeerScore";
import * as collectionConstants from "../CollectionConstants";

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
    collection(firestore, collectionConstants.BeerScore),
    JSON.parse(JSON.stringify(beerScore))
  );

  beerScore.SetDocumentID = data.id;

  res.status(200).json(beerScore);
  console.log(beerName + " added to beer score list.");
};

export default handler;
