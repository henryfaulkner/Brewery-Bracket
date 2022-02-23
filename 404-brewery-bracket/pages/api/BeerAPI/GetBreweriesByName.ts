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

  let typeaheadText: string = req.body["typeahead"];
  let limit: number = req.body["limit"];

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

  let numApproved: number = 0;
  var breweryList: BreweryData[] = resData.data.filter((brewery) => {
    //Make higher-order function to replicate this functionality
    //if (numApproved > 20) break;

    //normalize strings
    var breweryNameLower = brewery.name.toLowerCase();
    var typeaheadTextLower = typeaheadText.toLowerCase();

    // max
    if (breweryNameLower.startsWith(typeaheadTextLower)) numApproved++;
    return (
      breweryNameLower.startsWith(typeaheadTextLower) && numApproved > limit
    );
  });

  console.log(typeaheadText);
  console.log(breweryList);

  res.status(200).json(breweryList);
};

export default handler;
