import React, { useState, useEffect, useContext } from "react";
import styles from "../../styles/components/AdditionalInfoModal.module.scss";
import Link from "next/link";
import { UserContext } from "../../lib/context";

type Props = {
  showModal: {};
  setShowModal;
  tryLogin;
};

const RedirectToLoginModal: React.FC<Props> = (props) => {
  const { user, username } = useContext(UserContext);
  const [text, setText]: [string, any] = useState("");

  const createUserDoc = async (username) => {
    const request = {
      uid: user.uid,
      email: user.email,
      username: username,
    };

    await fetch("/api/Firebase/Endpoints/CreateUserDoc", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    await props.tryLogin();
  };

  return (
    <div className={styles.modal} style={props.showModal}>
      <div className={styles.modalForm}>
        <h2 className={styles.h2}>All you need now is a Username.</h2>
        <input onChange={(e) => setText(e.target.value)} />
        <div className={styles.buttonContainer}>
          <Link href="/">
            <button
              className={styles.button2}
              onClick={() => {
                props.setShowModal({ display: "none" });
                createUserDoc(text);
              }}
            >
              Register Username
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RedirectToLoginModal;
