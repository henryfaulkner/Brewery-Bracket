import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import * as collectionConstants from "../CollectionConstants";
import FirebaseExtensions from "../../HelperMethods/FirebaseExtensions";
import Bracket from "../Models/Bracket";

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

const auth = getAuth(firebase[0]);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Bracket[]>
) => {
  const collectionRef = collection(firebase[1], collectionConstants.Brackets);
  const q = await query(collectionRef);
  const docs = await getDocs(q);

  let response: Bracket[] = [];
  if (!docs.empty) {
    docs.forEach((data) => {
      response.push(
        new Bracket({
          DocumentID: data.data().DocumentID,
          BracketName: data.data().BracketName,
          GroupID: data.data().GroupID,
        })
      );
    });
  }

  res.status(200).json(response);
};

export default handler;
