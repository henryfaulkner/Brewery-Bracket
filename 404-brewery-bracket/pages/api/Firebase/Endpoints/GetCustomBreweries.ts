import { NextApiRequest, NextApiResponse } from "next";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import CustomBrewery from "../Models/CustomBrewery";
import * as collectionConstants from "../CollectionConstants";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CustomBrewery[]>
) => {
  const data = await getDocs(
    collection(getFirestore(), collectionConstants.CustomBreweries)
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
