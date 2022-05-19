import React, { useEffect, useState, useContext, useRef } from "react";
import Image from "next/image";
import styles from "../styles/components/DeleteClickable.module.scss";
import idleSVG from "../public/delete-white.svg";
import hoverSVG from "../public/delete-gray-hover.svg";

type Props = {
  DeleteOnClick: () => void;
};

const DeleteIcon = (props: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {!isHover && (
        <Image
          className={styles.Icon}
          src="/delete-white.svg"
          alt="Delete White"
          objectFit="contain"
          layout="fill"
          onClick={() => props.DeleteOnClick()}
        />
      )}
      {isHover && (
        <Image
          className={styles.Icon}
          src="/delete-gray-hover.svg"
          alt="Delete White"
          objectFit="contain"
          layout="fill"
          onClick={() => props.DeleteOnClick()}
        />
      )}
    </div>
  );
};

export default DeleteIcon;
