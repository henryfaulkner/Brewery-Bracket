import { useRouter } from "next/router";

const BreweryDay = () => {
  const router = useRouter();
  const { scorecardid } = router.query;

  return <div>Scorecard Id: {scorecardid}</div>;
};

export default BreweryDay;
