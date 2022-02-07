import { useRouter } from "next/router";
import { GetAllBeersFromGivenBrewery } from "../api/BeerAPI/catalog-beer";
import Card from "../../components/Card";
import { React, Component } from "react";

export default class BreweryDay extends Component {
  constructor() {
    super();
    this.state = {
      breweryObj: {
        breweryName: "",
        beerCards: [],
      },
    };
  }

  async componentDidMount() {
    const router = useRouter();
    this.setState({
      breweryObj: await getBeerCards(router),
    });
  }

  render() {
    return (
      <div>
        <h1 className="brewery-title">{this.state.breweryObj.breweryName}</h1>
        {this.state.breweryObj.beerCards}
      </div>
    );
  }
}

async function getBeerCards(router) {
  const { id } = router.query;

  var breweryObj = await GetAllBeersFromGivenBrewery(null, null, id);
  console.log(breweryObj);

  var breweryName = breweryObj.name;
  var beerCards = breweryObj.beers.map((beer) => {
    <Card name={beer.name} />;
  });

  return {
    breweryName: breweryName,
    beerCards: beerCards,
  };
}
