import React, { useState, useEffect } from "react";
import styles from "../styles/CustomBreweryTextbox.module.scss";

type CustomBreweryObject = {
  name: string;
};

const CustomBreweryTextbox = () => {
  const [inputText, setInputText]: [string, any] = useState();
  const createCustomBrewery = async () => {
    var customBreweryObject: CustomBreweryObject = {
      name: inputText,
    };

    const response = await fetch("/api/Firebase/AddCustomBrewery", {
      method: "POST",
      body: JSON.stringify(customBreweryObject),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();
  };

  return (
    <div>
      <input
        type="text"
        id="input"
        onChange={(e) => setInputText(e.target.value)}
        autoComplete={"off"}
      />
      <button className={styles.btn} onClick={createCustomBrewery}>
        Add
      </button>
    </div>
  );
};

export default CustomBreweryTextbox;
