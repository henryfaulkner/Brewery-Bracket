import { NextApiRequest, NextApiResponse } from "next";
import { collection, addDoc, getFirestore } from "firebase/firestore";

import BreweryObject from "../Models/BreweryObject";
import * as CollectionConstants from "../CollectionConstants";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BreweryObject>
) => {
  const submittedBreweryName: string = req.body["name"];
  let customBrewery: BreweryObject = new BreweryObject({
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
    collection(getFirestore(), CollectionConstants.CustomBreweries),
    JSON.parse(JSON.stringify(customBrewery))
  );

  customBrewery.SetDocumentID = data.id;

  res.status(200).json(customBrewery);
  console.log(submittedBreweryName + " added to custom breweries.");
};

export default handler;
