import React, { useState, useEffect } from "react";
import styles from "../styles/components/CustomBreweryTextbox.module.scss";
import Portal from "./Portal";
import BreweryObject from "../pages/api/Firebase/Models/BreweryObject";

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

    let customBreweryObject: CustomBreweryObject = {
      name: inputText,
    };

    const response = await fetch("/api/Firebase/Endpoints/AddCustomBrewery", {
      method: "POST",
      body: JSON.stringify(customBreweryObject),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = new BreweryObject(await response.json());
    setRecentAdditionId(data.GetDocumentID);
  };

  return (
    <div className={styles.wrapper}>
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
        Type={"AdditionalInfoModal"}
        showModal={showModal}
        setShowModal={setShowModal}
        recentAdditionName={inputText}
        recentAdditionId={recentAdditionId}
      />
    </div>
  );
};

export default CustomBreweryTextbox;
