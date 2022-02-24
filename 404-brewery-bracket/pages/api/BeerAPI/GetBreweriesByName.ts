import { NextApiRequest, NextApiResponse } from "next";

type BreweryData = {
  name: string;
  id: string;
};

var base64 = require("base-64");
var BaseUrl = "http://api.catalog.beer";

// Get all breweries that match typeahead filter
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BreweryData[]>
) => {
  let url = BaseUrl + `/brewer?count=10000`;
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

  res.status(200).json(resData.data);
};

export default handler;
