import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Firestore,
  collection,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import * as CollectionConstants from "../CollectionConstants";
import User from "../Models/User";
import FirebaseExtensions from "../../../../helpers/FirebaseExtensions";
import Cors from 'cors';
import { runMiddleware } from "../../middleware";

const cors = Cors({
  methods: ['POST', 'HEAD'],
});

type Data = {
  statusMessage: string;
};

/** 
 * @swagger
 *  /api/Firebase/Endpoints/CreateUserDoc:
 *    post:
 *      summary: Create User Document
 *      description: Create a User document.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              email: string
 *              uid: string
 *              username: string
 *            example:
 *              email: example@gmail.com
 *              uid: jgtdtujRoTbN5qZnMJxQOBF8Kbe2
 *              username: John Smith
 *      responses:
 *        '200':
 *          description: OK
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  statusMessage: 
 *                    type: string
*/
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await runMiddleware(req, res, cors);
  
  const email: string = req.body["email"];
  const uid: string = req.body["uid"];
  const username: string = req.body["username"];

  try {
    // Signed in
    const userObj = new User({
      UserID: uid,
      Email: email,
      Username: username,
      Groups: [],
    });
    addDoc(
      collection(getFirestore(), CollectionConstants.Users),
      JSON.parse(JSON.stringify(userObj))
    ).then((res) => {
      userObj.SetDocumentID = res.id;
    });

    
    console.log("Successfully created user");
    res.status(200).json({ statusMessage: "Successfully call." });
  } catch (exception) {
    console.log("Something went wrong.");

    res.status(500).json({ statusMessage: "Error on call." });
  }
};

export default handler;
