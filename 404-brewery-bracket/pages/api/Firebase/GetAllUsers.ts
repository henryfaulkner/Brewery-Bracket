import { NextApiRequest, NextApiResponse } from 'next';
import { useState, useEffect } from 'react';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";

const firebaseConfig = {
   apiKey: process.env.FIREBASE_APIKEY,
   authDomain: process.env.FIREBASE_AUTHDOMAIN,
   projectId: process.env.FIREBASE_PROJECTID,
   storageBucket: process.env.FIREBASE_STORAGEBUCKET,
   messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
   appId: process.env.FIREBASE_APPID,
   measurementId: process.env.FIREBASE_MEASUREMENTID
 }
 
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 // Create Firestore instance
 const firestore = getFirestore(app);

const usersCollection = collection(firestore,'Users');

const handler = async (req : NextApiRequest, res : NextApiResponse) => {
    // query: gets first 10 users in db
    const todosQuery = query(usersCollection,limit(10));

    // trigger query
    const querySnapshot = await getDocs(todosQuery);
    
    // map through todos adding them to an array
    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
       result.push(snapshot);
    });

    console.log(result);

    res.status(200).json(result);
 };

 export default handler;