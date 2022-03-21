import React, { useState, useEffect } from "react";
import styles from "../styles/CustomBreweryTextbox.module.scss";
import AdditionalInfoModal from "./AdditionalInfoModal";
import Portal from "./Portal";
import { stringify } from "querystring";

type CustomBreweryObject = {
  name: string;
};

const CustomBreweryTextbox = () => {
  const [inputText, setInputText]: [string, any] = useState("");
  const [showModal, setShowModal]: [{}, any] = useState({ display: "none" });
  const [recentAdditionId, setRecentAdditionId]: [string, any] = useState("");

  const createCustomBrewery = async () => {
    if (inputText === "") return;

    //Show Modal
    setShowModal(() => {
      if (showModal["display"] === "none") return { display: "" };
      else return { display: "none" };
    });

    var customBreweryObject: CustomBreweryObject = {
      name: inputText,
    };

    const response = await fetch("/api/Firebase/Endpoints/AddCustomBrewery", {
      method: "POST",
      body: JSON.stringify(customBreweryObject),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();
    setRecentAdditionId(data._key.path.segments[1]);
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
      <Portal
        showModal={showModal}
        setShowModal={setShowModal}
        recentAdditionName={inputText}
        recentAdditionId={recentAdditionId}
      />
    </div>
  );
};

export default CustomBreweryTextbox;
