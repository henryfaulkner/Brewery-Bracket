import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

type Data = {
   email: string,
   password: string
}

const auth = getAuth();


 const handler = async (req : NextApiRequest, res : NextApiResponse<Data>) => {
   req.

    var data : Data = {
        str: "Hello World"
    };

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

    res.status(200).json(data);
 };

 export default handler;