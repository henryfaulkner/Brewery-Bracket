import React from "react";
import styles from "../styles/AdditionalInfoModal.module.scss";

type Brewery = {
  url: string;
  address: string;
};

const AdditionalInfoModal = (props) => {
  console.log(props.showModel);
  return (
    <div className={styles.modal} style={props.showModal}>
      <div className={styles.modalForm}>
        <h2 className={styles.h2}>Brewery Additional Information</h2>
        <p className={styles.p}>
          *Totally optional but helps make the app better :)
        </p>

        <div className={styles.inputRows}>
          <div className={styles.inputRow}>
            <h5 className={styles.h5}>Address</h5>
            <input type="text" className={styles.input} id="address" />
          </div>
          <div className={styles.inputRow}>
            <h5 className={styles.h5}>Url</h5>
            <input type="text" className={styles.input} id="url" />
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
            onClick={() => props.setShowModal({ display: "none" })}
          >
            Contribute
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoModal;
