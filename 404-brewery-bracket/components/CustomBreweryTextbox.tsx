import React, { useState, useEffect } from "react";

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
      <button onClick={createCustomBrewery} />
    </div>
  );
};

export default CustomBreweryTextbox;
