import { NextApiRequest, NextApiResponse } from "next";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import User from "../Models/User";
import * as collectionConstants from "../CollectionConstants";
import Cors from 'cors';
import { runMiddleware } from "../../middleware";

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

/**
 * @swagger
 * /api/Firebase/Endpoints/GetAllUsers:
 *   get:
 *     summary: List Users
 *     description: Returns all User documents
 *     responses:
 *       200:
 *         description: User object list
 */
const handler = async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
  await runMiddleware(req, res, cors);
  const collectionRef = collection(getFirestore(), collectionConstants.Users);
  const data = await getDocs(
    collection(getFirestore(), collectionConstants.Users)
  );
  let response: User[] = [];
  data.forEach((doc) => {
    response.push(
      new User({
        Username: doc.data().Username,
        Email: doc.data().Email,
        UserID: doc.data().UserID,
        Groups: doc.data().Groups,
        DocumentID: doc.id,
      })
    );
  });

  res.status(200).json(response);
};

export default handler;
