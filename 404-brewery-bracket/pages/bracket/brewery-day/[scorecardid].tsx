import { useRouter } from "next/router";
import AddBeerScorecardContainer from "../../../components/Scorecard/AddBeerScorecardContainer";
import Portal from "../../../components/Portal";
import BeerScoreList from "../../../components/Scorecard/BeerScoreList";
import { useEffect, useState } from "react";
import BreweryDayScorecard from "../../api/Firebase/Models/BreweryDayScorecard";
import styles from "../../../styles/Scorecard.module.scss";

let hasPulledData = false;

const BreweryDay = () => {
  const router = useRouter();
  const [scorecard, setScorecard]: [BreweryDayScorecard, any] = useState(
    new BreweryDayScorecard({})
  );
  const [showModal, setShowModal]: [{}, any] = useState({ display: "none" });

  useEffect(() => {
    const fetchData = async () => {
      if (hasPulledData === false && router.isReady) {
        let { scorecardid } = router.query;
        await GetCurrentScorecard(scorecardid);

        hasPulledData = true;
      }
    };

    fetchData();
  });

  const GetCurrentScorecard = async (scorecardid) => {
    const request = {
      DocumentID: scorecardid,
    };
    //this comment makes the scorecard query work ????
    console.log("scorecard id: " + scorecardid);

    await fetch("/api/Firebase/Endpoints/GetScorecardById", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((res: JSON) => {
        setScorecard(new BreweryDayScorecard(res));
        console.log("og scorecard: " + JSON.stringify(scorecard));
      });
  };

  const ChangeShowModal = () => {
    setShowModal(() => {
      if (showModal["display"] === "none") return { display: "" };
      else return { display: "none" };
    });
  };

  return (
    <div>
      <h1>Brewery: {scorecard.AssociatedBreweryName}</h1>
      <div className={styles.Row}>
        <BeerScoreList BeerScoreList={[<p>ooga booga</p>]} />
        <AddBeerScorecardContainer Scorecard={scorecard} />
      </div>
      <button onClick={ChangeShowModal}>Finalize Scorecard</button>
      <Portal
        Type={"FinalizeScorecardModal"}
        showModal={showModal}
        setShowModal={setShowModal}
        Scorecard={scorecard}
      />
    </div>
  );
};

export default BreweryDay;
