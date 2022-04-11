import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import { Firestore, collection, addDoc } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import CustomBrewery from "../Models/CustomBrewery";
import * as CollectionConstants from "../CollectionConstants";
import FirebaseExtensions from "../../HelperMethods/FirebaseExtensions";

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CustomBrewery>
) => {
  const submittedBreweryName: string = req.body["name"];
  let customBrewery: CustomBrewery = new CustomBrewery({
    Name: submittedBreweryName,
    Description: "",
    Short_Description: "",
    Url: "",
    Facebook_Url: "",
    Twitter_Url: "",
    Instagram_Url: "",
    Address: "",
  });

  const data = await addDoc(
    collection(firebase[1], CollectionConstants.CustomBreweries),
    JSON.parse(JSON.stringify(customBrewery))
  );

  customBrewery.SetDocumentID(data.id);

  res.status(200).json(customBrewery);
  console.log(submittedBreweryName + " added to custom breweries.");
};

export default handler;
