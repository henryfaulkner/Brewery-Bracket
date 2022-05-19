import React, { useState, useEffect } from "react";
import styles from "../../styles/components/AdditionalInfoModal.module.scss";
import Link from "next/link";

type Props = {
  showModal: {};
  setShowModal;
};

const RedirectToLoginModal: React.FC<Props> = (props) => {
  return (
    <div className={styles.modal} style={props.showModal}>
      <div className={styles.modalForm}>
        <h2 className={styles.h2}>You'll need to login to do that.</h2>

        <div className={styles.buttonContainer}>
          <button
            className={styles.button1}
            onClick={() => props.setShowModal({ display: "none" })}
          >
            Close
          </button>
          <Link href="/login-form">
            <button
              className={styles.button2}
              onClick={() => {
                props.setShowModal({ display: "none" });
              }}
            >
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RedirectToLoginModal;
