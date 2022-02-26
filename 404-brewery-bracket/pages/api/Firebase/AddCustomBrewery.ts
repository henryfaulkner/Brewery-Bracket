import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import { Firestore, collection, addDoc } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import FirebaseExtensions from "../HelperMethods/FirebaseExtensions";

type CustomBreweryObject = {
  name: string;
  description: string;
  short_description: string;
  url: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
};

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const submittedBreweryName: string = req.body["name"];

  const data = await addDoc(collection(firebase[1], "Custom Breweries"), {
    name: submittedBreweryName,
    description: "",
    short_description: "",
    url: "",
    facebook_url: "",
    twitter_url: "",
    instagram_url: "",
  });

  res.status(200).json(data);
  console.log(submittedBreweryName + " added to custom breweries.");
};

export default handler;
