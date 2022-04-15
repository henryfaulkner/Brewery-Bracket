import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  getFirestore,
  where
} from "firebase/firestore";

import * as collectionConstants from "../CollectionConstants";
import Bracket from "../Models/Bracket";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Bracket[]>
) => {
  const userId = req.body["userId"]
  let response: Bracket[] = [];
  console.log("UserId: " + userId)

  const collectionRef = collection(getFirestore(), collectionConstants.Groups);
  const q = await query(collectionRef, where("Users", "array-contains", userId));

  //we are going the convert to array route 

  await getDocs(q).then(async docs => {
    if (!docs.empty) {
      console.log("User has groups")
      docs.forEach(async (data) => {
        const collectionRef = collection(getFirestore(), collectionConstants.Brackets);
        const q = await query(collectionRef, where("GroupID", "==", data.id));
        await getDocs(q).then(async docs => {
          for(const data in docs) {
            console.log("weeee")
          }

          docs.forEach(data => {
            console.log("Each bracket.")
            console.log(JSON.stringify({
              DocumentID: data.id,
              BracketName: data.data().BracketName,
              GroupID: data.data().GroupID,
            }))
            response.push(
              new Bracket({
                DocumentID: data.id,
                BracketName: data.data().BracketName,
                GroupID: data.data().GroupID,
              })
            );
          })
        });
      });
    }
  });
  
  console.log("response")
  console.log(response)
  res.status(200).json(response);
};

export default handler;
