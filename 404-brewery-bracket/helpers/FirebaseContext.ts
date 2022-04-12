import React from "react";
import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";
import FirebaseExtensions from "./FirebaseExtensions";

export const firebase: [FirebaseApp, Firestore] =
  FirebaseExtensions.InitializeFirebase();
export const FirebaseContext = React.createContext(
  firebase // default value
);
