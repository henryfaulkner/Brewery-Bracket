import { NextApiRequest, NextApiResponse } from "next";
import { useState, useEffect } from "react";
import { Firestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import FirebaseExtensions from "../HelperMethods/FirebaseExtensions";

var firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();

type Data = {
  str: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  var data: Data = {
    str: process.env.FIREBASE_APIKEY,
  };

  res.status(200).json(data);
};

export default handler;
