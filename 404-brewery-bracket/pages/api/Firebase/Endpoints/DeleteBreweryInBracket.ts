import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

import Bracket from "../Models/Bracket";
import BreweryObject from "../Models/BreweryObject";
import * as collectionConstants from "../CollectionConstants";

type Status = {};

const handler = async (req: NextApiRequest, res: NextApiResponse<Status>) => {
  try {
    const bracketId: string = req.body["bracketId"];
    const breweryId: string = req.body["breweryId"];

    const collectionRef = collection(
      getFirestore(),
      collectionConstants.Brackets
    );
    const docRef = doc(collectionRef, bracketId);
    const docSnapshot = await getDoc(docRef);
    const breweries = docSnapshot.data().Breweries;

    let newBreweryArr: BreweryObject[] = [];
    for(let i = 0; i < breweries.length; i++) {
        if (breweries[i].DocumentID !== breweryId) newBreweryArr.push(breweries[i]);
    }

    updateDoc(docRef, {
        Breweries: newBreweryArr,
    })

    console.log("Succeeded in removing brewery from bracket.");
    res.status(200).json({});
  } catch (exception) {
    console.log("Failed to remove brewery from bracket.");
    res.status(500).json({});
  }
};

export default handler;

