import { NextApiRequest, NextApiResponse } from "next";
import { useState, useEffect } from "react";
import { InitializeFirebase } from "../../../HelperMethods/FirebaseExtensions";

InitializeFirebase();

type Data = {
  str: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  var data: Data = {
    str: "Hello World",
  };

  res.status(200).json(data);
};

export default handler;
