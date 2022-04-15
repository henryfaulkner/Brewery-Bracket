import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  updateDoc,
  doc,
  getFirestore,
} from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("In handler");
  const customBreweryId: string = req.body["id"];
  const address: string = req.body["address"];
  const url: string = req.body["url"];

  const collectionRef = collection(
    getFirestore(),
    collectionConstants.CustomBreweries
  );

  const document = doc(collectionRef, customBreweryId);

  const data = await updateDoc(document, {
    Address: address,
    Url: url,
  });

  res.status(200).json(data);
  console.log(data);
  console.log("Updated custom breweries document.");
};

export default handler;
