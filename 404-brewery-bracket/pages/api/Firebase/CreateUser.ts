import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

type Data = {
  statusMessage: string;
};

const auth = getAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  var queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get("email");
  const password = urlParams.get("password");

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      console.log("User cred: " + user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("Error code: " + error.code);
      console.log("Error message: " + error.message);
    });

  res.status(200).json({ statusMessage: "Successfully created user" });
};

export default handler;
