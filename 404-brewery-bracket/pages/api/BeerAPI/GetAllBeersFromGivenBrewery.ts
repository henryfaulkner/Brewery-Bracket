import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  beers: Beer[];
};

type Beer = {
  id: string;
  name: string;
};

var base64 = require("base-64");
var BaseUrl = "http://api.catalog.beer";

// returns all beers from given brewery
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let breweryId: string | string[] = req.body["BreweryId"];
  let url = BaseUrl + `/brewer/${breweryId}/beer`;
  let username = process.env.beerapikey;
  let password = "";

  let headers = new Headers();

  headers.append(
    "Authorization",
    "Basic " + base64.encode(username + ":" + password)
  );

  var resData = await fetch(url, { method: "GET", headers: headers })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  var breweryNameandBeers = { name: resData.brewer.name, beers: [] };
  resData.data.forEach((beer) => {
    breweryNameandBeers.beers.push({ name: beer.name, id: beer.id });
  });

  res.status(200).json(breweryNameandBeers);
};

export default handler;
