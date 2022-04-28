import Head from "next/head";
import { useRouter } from "next/router";
import AddBeerScorecardContainer from "../../../components/Scorecard/AddBeerScorecardContainer";
import Portal from "../../../components/Portal";
import BeerScoreList from "../../../components/Scorecard/BeerScoreList";
import { useEffect, useState } from "react";
import BreweryDayScorecard from "../../api/Firebase/Models/BreweryDayScorecard";
import BeerScore from "../../api/Firebase/Models/BeerScore";
import styles from "../../../styles/Scorecard.module.scss";

const BreweryDay = () => {
  const router = useRouter();
  const [scorecard, setScorecard]: [BreweryDayScorecard, any] = useState(
    new BreweryDayScorecard({})
  );
  const [beerList, setBeerList]: [BeerScore[], any] = useState([]);
  const [showModal, setShowModal]: [{}, any] = useState({ display: "none" });
  const [hasPulledData, setHasPulledData] = useState(false);
  const [aggregateBeerScore, setAggregateBeerScore]: [number, any] =
    useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (hasPulledData === false && router.isReady) {
        let { scorecardid } = router.query;
        await GetCurrentScorecard(scorecardid);
        await GetExistingBeerScores(scorecardid);
        AggregateExistingScores();

        setHasPulledData(true);
      }
    };

    fetchData();
  });

  const GetCurrentScorecard = async (scorecardid) => {
    const request = {
      DocumentID: scorecardid,
    };

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
      });
  };

  const GetExistingBeerScores = async (scorecardid) => {
    const request = {
      AssociatedScorecardID: scorecardid,
    };

    await fetch("/api/Firebase/Endpoints/GetScorecardBeerScores", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((res: JSON) => {
        setBeerList(res);
      });
  };

  const AggregateExistingScores = () => {
    setAggregateBeerScore(
      beerList.reduce((agg: number, score: BeerScore) => {
        return agg + score.Score;
      }, 0)
    );
  };

  const AddBeerScore = async (
    beerName: string,
    beerId: string,
    beerScore: number,
    isCustom = false
  ) => {
    const beerScoreObj = new BeerScore({
      BeerName: beerName,
      AssociatedBeerID: beerId,
      Score: beerScore,
      AssociatedScorecardID: scorecard.DocumentID,
      IsCustom: isCustom,
    });

    setBeerList([...beerList, beerScoreObj]);

    await fetch("/api/Firebase/Endpoints/AddBeerScore", {
      method: "POST",
      body: JSON.stringify(beerScoreObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    setAggregateBeerScore(aggregateBeerScore + beerScoreObj.Score);
  };

  const ChangeShowModal = () => {
    setShowModal(() => {
      if (showModal["display"] === "none") return { display: "" };
      else return { display: "none" };
    });
  };

  return (
    <div>
      <Head>
        <title>Scorecard Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="Description"
          content="Give ratings to the current brewery."
        />
        <meta name="Keywords" content="Brewery Bracket" />
      </Head>
      <h1>Brewery: {scorecard.AssociatedBreweryName}</h1>
      <div className={styles.Row}>
        <BeerScoreList BeerScoreList={beerList} />
        <AddBeerScorecardContainer
          Scorecard={scorecard}
          AddBeerScore={AddBeerScore}
        />
      </div>
      <button onClick={ChangeShowModal}>Finalize Scorecard</button>
      <Portal
        Type={"FinalizeScorecardModal"}
        showModal={showModal}
        setShowModal={setShowModal}
        Scorecard={scorecard}
        AggregateBeerScore={aggregateBeerScore}
        BeerListLength={beerList.length}
      />
    </div>
  );
};

export default BreweryDay;
