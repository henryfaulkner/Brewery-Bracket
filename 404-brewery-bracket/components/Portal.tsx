import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AdditionalInfoModal from "./AdditionalInfoModal";

const Portal = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);
  console.log(props.showModel);

  return mounted
    ? createPortal(
        <AdditionalInfoModal
          showModal={props.showModal}
          setShowModal={props.setShowModal}
        />,
        document.body
      )
    : null;
};

export default Portal;
