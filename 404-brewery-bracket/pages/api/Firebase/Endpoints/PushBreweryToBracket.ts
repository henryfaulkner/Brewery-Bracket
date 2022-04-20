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
  status: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Status>) => {
  try {
    const bracketId: string = req.body["bracketid"];
    const id = req.body["id"];
    const name = req.body["name"];
    const Description = req.body["Description"];
    const Short_Description = req.body["Short_Description"];
    const Url = req.body["Url"];
    const Facebook_Url = req.body["Facebook_Url"];
    const Twitter_Url = req.body["Twitter_Url"];
    const Instagram_Url = req.body["Instagram_Url"];
    const Address = req.body["Address"];

    const breweryObj = new BreweryObject({
      id: id,
      name: name,
      Description: Description ?? "",
      Short_Description: Short_Description ?? "",
      Url: Url ?? "",
      Facebook_Url: Facebook_Url ?? "",
      Twitter_Url: Twitter_Url ?? "",
      Instagram_Url: Instagram_Url ?? "",
      Address: Address ?? "",
    });

    const collectionRef = collection(
      getFirestore(),
      collectionConstants.Brackets
    );
    const docRef = doc(collectionRef, bracketId);
    const docSnapshot = await getDoc(docRef);
    updateDoc(docRef, {
      Breweries: arrayUnion(JSON.parse(JSON.stringify(breweryObj))),
    });

    console.log("Succeeded in adding brewery to bracket.");
    res.status(200).json({ status: "Succeeded in adding brewery to bracket." });
  } catch (exception) {
    console.log("Failed to add brewery to bracket.");
    res.status(500).json({ status: "Failed to add brewery." });
  }
};

export default handler;
