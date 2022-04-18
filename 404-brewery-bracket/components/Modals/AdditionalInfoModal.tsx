import React, { useState } from "react";
import styles from "../../styles/AdditionalInfoModal.module.scss";

type Brewery = {
  url: string;
  address: string;
};

type CustomBreweryObject = {
  name: string;
  id: string;
  address: string;
  url: string;
};

type Props = {
  showModal: {};
  setShowModal;
  recentAdditionName: string;
  recentAdditionId: string;
};

const AdditionalInfoModal: React.FC<Props> = (props) => {
  const [urlValue, setUrlValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  const UpdateCustomBreweryDoc = async () => {
    var customBreweryObject: CustomBreweryObject = {
      name: props.recentAdditionName,
      id: props.recentAdditionId,
      address: addressValue,
      url: urlValue,
    };

    const response = await fetch(
      "/api/Firebase/Endpoints/UpdateCustomBreweryDoc",
      {
        method: "POST",
        body: JSON.stringify(customBreweryObject),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
  };

  return (
    <div className={styles.modal} style={props.showModal}>
      <div className={styles.modalForm}>
        <h2 className={styles.h2}></h2>
        <h2 className={styles.h2}>
          Additional Information for {props.recentAdditionName}
        </h2>
        <p className={styles.p}>
          *Totally optional but helps make the app better :)
        </p>

        <div className={styles.inputRows}>
          <div className={styles.inputRow}>
            <h5 className={styles.h5}>Address</h5>
            <input
              type="text"
              className={styles.input}
              id="address"
              onChange={(e) => setAddressValue(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <h5 className={styles.h5}>Url</h5>
            <input
              type="text"
              className={styles.input}
              id="url"
              onChange={(e) => setUrlValue(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.button1}
            onClick={() => props.setShowModal({ display: "none" })}
          >
            Close
          </button>
          <button
            className={styles.button2}
            onClick={() => {
              props.setShowModal({ display: "none" });
              UpdateCustomBreweryDoc();
            }}
          >
            Contribute
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoModal;
