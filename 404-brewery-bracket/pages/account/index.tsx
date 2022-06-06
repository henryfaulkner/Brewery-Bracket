import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { User } from "firebase/auth";
import { UserContext } from "../../lib/context";
import {useContext} from "react";
import Logout from "../../components/LogoutButton";

const Account = () => {
  const {user, username} = useContext(UserContext)
  return (
    <div>
      <div>
        <h1>Account Information</h1>
        <h3>Email: {user?.email ?? "not logged in"}</h3>
        <h3>Visted Breweries</h3>
        <hr />
        <Logout />
      </div>
    </div>
  );
};

export default Account;
