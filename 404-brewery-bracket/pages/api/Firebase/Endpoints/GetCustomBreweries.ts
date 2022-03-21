import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import { Firestore, collection, getDocs } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import CustomBrewery from "../Models/CustomBrewery";
import * as collectionConstants from "../CollectionConstants";
import FirebaseExtensions from "../../HelperMethods/FirebaseExtensions";

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CustomBrewery[]>
) => {
  const data = await getDocs(
    collection(firebase[1], collectionConstants.CustomBreweries)
  );
  let response: CustomBrewery[] = [];
  data.forEach((doc) => {
    response.push(
      new CustomBrewery(
        doc.data().name,
        doc.data().description,
        doc.data().short_description,
        doc.data().url,
        doc.data().facebook_url,
        doc.data().twitter_url,
        doc.data().instagram_url,
        doc.data().address,
        doc.id
      )
    );
  });

  res.status(200).json(response);
  console.log(response);
};

export default handler;
