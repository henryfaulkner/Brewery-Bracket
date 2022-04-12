import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import { Firestore, collection, getDocs } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import CustomBrewery from "../Models/CustomBrewery";
import * as collectionConstants from "../CollectionConstants";
import FirebaseExtensions from "../../../../helpers/FirebaseExtensions";

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
      new CustomBrewery({
        Name: doc.data().Name,
        Description: doc.data().Description,
        Short_Description: doc.data().Short_Description,
        Url: doc.data().Url,
        Facebook_Url: doc.data().Facebook_Url,
        Twitter_Url: doc.data().Twitter_Url,
        Instagram_Url: doc.data().Instagram_Url,
        Address: doc.data().Address,
        DocumentID: doc.id,
      })
    );
  });

  res.status(200).json(response);
};

export default handler;
