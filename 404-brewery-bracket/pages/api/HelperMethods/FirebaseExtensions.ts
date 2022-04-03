import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, getDocs } from "firebase/firestore";
import { useState } from "react";

function InitializeFirebase(): [FirebaseApp, Firestore] {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID,
  };

  // Initialize Firebase
  const app: FirebaseApp = initializeApp(firebaseConfig);

  // Create Firestore instance
  const firestore: Firestore = getFirestore(app);

  return [app, firestore];
}

type BreweryObject = {
  name: string;
  description: string;
  short_description: string;
  url: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  address: string;
};

function GetAllBreweries(request) {
  var [allBreweries, setAllBreweries]: [BreweryObject[], any] = useState();

  //Call API breweries
  fetch("/api/BeerAPI/GetApiBreweries", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((response: BreweryObject[]) => {
      setAllBreweries(response);
    });

  //Call Firestore breweries
  fetch("/api/Firebase/Endpoints/GetCustomBreweries", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((response: BreweryObject[]) => {
      setAllBreweries([allBreweries, response]);
    });

  return allBreweries;
}

export default { InitializeFirebase, GetAllBreweries };
