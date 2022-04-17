import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/BrewerySearchByName.module.scss";
import CardList from "./CardList";
import Card from "./Card";
import Portal from "./Portal";
import BreweryDayScorecard from "../pages/api/Firebase/Models/BreweryDayScorecard";
import { UserContext } from "../lib/context";
import { User } from "firebase/auth";

type BreweryObject = {
  id: string;
  name: string;
  description: string;
  short_description: string;
  url: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  address: string;
};

type SearchRequest = {
  typeahead: string;
  limit: number;
};

const searchLimit = 6;
let searchResultsOptions: JSX.Element[] = [];

const UserSearchByUsername = () => {};

export default UserSearchByUsername;
