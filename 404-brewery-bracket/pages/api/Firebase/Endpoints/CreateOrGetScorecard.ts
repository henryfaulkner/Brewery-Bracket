import { NextApiRequest, NextApiResponse } from "next";
import { useUserData } from "../../../../lib/hooks";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  DocumentData,
  getFirestore,
} from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";
import BreweryDayScorecard from "../Models/BreweryDayScorecard";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BreweryDayScorecard>
) => {
  try {
    const userId: string = req.body["userId"];
    //could be bracket Id but I think brewery scorecard for user should persistant
    const breweryID: string = req.body["breweryID"];
    const breweryName: string = req.body["breweryName"];
    const bracketID: string = req.body["bracketID"];

    const collectionRef = collection(
      getFirestore(),
      collectionConstants.BreweryDayScorecard
    );
    const q = await query(
      collectionRef,
      where("AssociatedBreweryID", "==", breweryID),
      where("AssociatedUserID", "==", userId)
    );
    const docs = await getDocs(q);

    let scorecard: BreweryDayScorecard;

    if (docs.empty) {
      console.log("no documents.");

      let data: DocumentData;

      scorecard = new BreweryDayScorecard({
        AssociatedUserID: userId,
        AssociatedBracketID: bracketID,
        AssociatedBreweryID: breweryID,
        AssociatedBreweryName: breweryName,
        AverageBeerScore: 0,
        EnvironmentScore: 0,
        LocationScore: 0,
      });

      data = await addDoc(
        collection(getFirestore(), collectionConstants.BreweryDayScorecard),
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
            AverageBeerScore: data.data().AverageBeerScore,
            EnvironmentScore: data.data().EnvironmentScore,
            LocationScore: data.data().LocationScore,
            DocumentID: data.id,
          })
        );
      });

      scorecard = response[0];
    }

    console.log("CreateOrGetScorecard Succeeded.");
    res.status(200).json(scorecard);
  } catch (exception) {
    console.log("CreateOrGetScorecard Failed.");
    res.status(500);
  }
};

export default handler;
