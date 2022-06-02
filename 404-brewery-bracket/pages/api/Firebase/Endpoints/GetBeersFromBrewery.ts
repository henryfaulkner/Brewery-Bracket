import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  QuerySnapshot,
  DocumentData
} from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";
import CustomBeer from "../Models/CustomBeer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const breweryId = req.body["BreweryId"];

  try {
    const collectionRef = collection(getFirestore(), collectionConstants.CustomBeers);
    const q = await query(
        collectionRef,
        where("AssociatedBreweryID", "==", breweryId)
    );
    const data: QuerySnapshot<DocumentData> = await getDocs(q);

    let response: CustomBeer[] = [];
    
    data.forEach((doc) => {
      console.log(doc)
      response.push(
        new CustomBeer({
          Name: doc.data().Name,
          AssociatedBreweryID: doc.data().AssociatedBreweryID,
          AssociatedBreweryName: doc.data().AssociatedBreweryName,
          ABV: doc.data().ABV,
          IBU: doc.data().IBU,
          Description: doc.data().Description,
          Style: doc.data().Style,
          DocumentID: doc.id,
        })
      );
    });

    res
      .status(200)
      .json({ beers: response });
  } catch (exception) {
    res.status(500);
  }
};

export default handler;
