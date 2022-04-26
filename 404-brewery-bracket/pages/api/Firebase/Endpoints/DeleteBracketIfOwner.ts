import { NextApiRequest, NextApiResponse } from "next";
import { useUserData } from "../../../../lib/hooks";
import {
  collection,
  query,
  where,
  deleteDoc,
  getDocs,
  DocumentData,
  doc,
  getFirestore,
  writeBatch,
} from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";
import { firestore } from "../../../../lib/firebase";

// TBD Ownership conditional
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const bracketID = req.body["bracketID"];
    const groupID = req.body["groupID"];
    const firestore = getFirestore();

    // Delete Bracket
    await deleteDoc(doc(firestore, collectionConstants.Brackets, bracketID));

    // Delete Associated Group
    await deleteDoc(doc(firestore, collectionConstants.Groups, groupID));

    // Delete All Associated Scorecards and All of their Associated BeerScores
    const collectionRef = collection(
      firestore,
      collectionConstants.BreweryDayScorecard
    );
    const q = query(
      collectionRef,
      where("AssociatedBracketID", "==", bracketID)
    );

    // Batch delete Scorecards
    // Note: There is a 500 Write Limit for each batch commit
    const scorecards = await getDocs(q);
    for (const scorecardDoc of scorecards.docs) {
      const batch = writeBatch(firestore);
      const collectionRef2 = collection(
        firestore,
        collectionConstants.BeerScore
      );
      const q2 = query(
        collectionRef2,
        where("AssociatedScorecardID", "==", scorecardDoc.id)
      );
      const beerScores = await getDocs(q2);
      for (const beerScore of beerScores.docs) {
        batch.delete(
          doc(firestore, collectionConstants.BeerScore, beerScore.id)
        );
      }
      batch.delete(
        doc(firestore, collectionConstants.BreweryDayScorecard, scorecardDoc.id)
      );
      batch.commit();
    }

    console.log("Succeeded in completing bracket deletion.");
    res
      .status(200)
      .json({ success: "Succeeded in completing bracket deletion." });
  } catch (exception) {
    console.log("Failed to complete bracket deletion.");
    res.status(500).json({ success: "Failed to complete bracket deletion." });
  }
};

export default handler;
