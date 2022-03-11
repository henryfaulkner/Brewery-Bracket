import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import { Firestore, collection, getDocs } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import FirebaseExtensions from "../HelperMethods/FirebaseExtensions";

type CustomBreweryObject = {
  id: string;
  name: string;
  description: string;
  short_description: string;
  url: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  address: string;
};

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CustomBreweryObject[]>
) => {
  const data = await getDocs(collection(firebase[1], "Custom Breweries"));
  let response: CustomBreweryObject[] = [];
  data.forEach((doc) => {
    response.push({
      id: doc.id,
      name: doc.data().name,
      description: doc.data().description,
      short_description: doc.data().short_description,
      url: doc.data().url,
      facebook_url: doc.data().facebook_url,
      twitter_url: doc.data().twitter_url,
      instagram_url: doc.data().instagram_url,
      address: doc.data().address,
    });
  });

  res.status(200).json(response);
  console.log(response);
};

export default handler;
