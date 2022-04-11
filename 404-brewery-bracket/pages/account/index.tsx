import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { User } from "firebase/auth";

type CurrentUserData = {
  CurrentUser: User;
};

const Account = (props) => {
  const [hasPulledData, setHasPulledData] = useState(false);

  useEffect(() => {
    if (hasPulledData === false) {
      getCurrentUser();
      setHasPulledData(true);
    }
  });

  const [currentUser, setCurrentUser]: [CurrentUserData, any] = useState({
    CurrentUser: null,
  });

  const getCurrentUser = async () => {
    const response = await fetch("/api/Firebase/Endpoints/GetCurrentUser", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setCurrentUser(await response.json());
  };

  return (
    <div>
      <div>
        <h1>Account Information</h1>
        <h3>Email: {currentUser?.CurrentUser?.email ?? "not logged in"}</h3>
        <h3>Visted Breweries</h3>
      </div>
    </div>
  );
};

export default Account;
