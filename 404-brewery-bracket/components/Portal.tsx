import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AdditionalInfoModal from "./Modals/AdditionalInfoModal";
import RedirectToLoginModal from "./Modals/RedirectToLoginModal";
import UsernameModal from "./Modals/UsernamePortal";
import BreweryDayScorecard from "../pages/api/Firebase/Models/BreweryDayScorecard";
import FinalizeScorecardModal from "./Scorecard/FinalizeScorecardModal";

type Props = {
  Type: string;
  showModal: {};
  setShowModal;
  recentAdditionName?: string;
  Scorecard?: BreweryDayScorecard;
  recentAdditionId?: string;
  AggregateBeerScore?: number;
  BeerListLength?: number;
  tryLogin?;
  uid?: string;
  email?: string;
  password?: string;
};

const Portal: React.FC<Props> = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  switch (props.Type) {
    case "AdditionalInfoModal":
      return mounted
        ? createPortal(
            <AdditionalInfoModal
              showModal={props.showModal}
              setShowModal={props.setShowModal}
              recentAdditionName={props.recentAdditionName}
              recentAdditionId={props.recentAdditionId}
            />,
            document.body
          )
        : null;
    case "FinalizeScorecardModal":
      return mounted
        ? createPortal(
            <FinalizeScorecardModal
              showModal={props.showModal}
              setShowModal={props.setShowModal}
              Scorecard={props.Scorecard}
              AggregateBeerScore={props.AggregateBeerScore}
              BeerListLength={props.BeerListLength}
            />,
            document.body
          )
        : null;
    case "RedirectToLoginModal":
      return mounted
        ? createPortal(
            <RedirectToLoginModal
              showModal={props.showModal}
              setShowModal={props.setShowModal}
            />,
            document.body
          )
        : null;
    case "UsernameModal":
      return mounted
        ? createPortal(
            <UsernameModal
              showModal={props.showModal}
              setShowModal={props.setShowModal}
            />,
            document.body
          )
        : null;
  }
  return;
};

export default Portal;
