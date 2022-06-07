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

type Status = {
  breweries: BreweryObject[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Status>) => {
  try {
    const bracketId: string = req.body["bracketid"];

    const collectionRef = collection(
      getFirestore(),
      collectionConstants.Brackets
    );
    const docRef = doc(collectionRef, bracketId);
    const docSnapshot = await getDoc(docRef);
    const breweries = docSnapshot.data().Breweries;

    console.log("Succeeded in adding brewery to bracket.");
    res.status(200).json({ breweries: JSON.parse(JSON.stringify(breweries)) });
  } catch (exception) {
    console.log("Failed to add brewery to bracket.");
    res.status(500).json({ breweries: [] });
  }
};

export default handler;
