import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string,
    beers: string[]
}

var base64 = require('base-64');
var BaseUrl = "http://api.catalog.beer";

// returns all beers from given brewery
const handler = async (req : NextApiRequest, res : NextApiResponse<Data>) => {
    let breweryId : string|string[] = req.query.breweryId;
    let url = BaseUrl + `/brewer/${breweryId}/beer`;
    let username = process.env.beerapikey;
    let password = "";

    let headers = new Headers();

    console.log("url: ", url);

    headers.append('Authorization', 'Basic ' + base64.encode(username+ ":" + password));

    console.log("before fetch");

    var resData = await fetch(url, {method:'GET',
            headers: headers
        })
    .then(response => response.json())
    .then(data => {return data});

    console.log(resData)

    var breweryNameandBeers = {name: resData.brewer.name, beers: []};
    resData.data.forEach(beer => {
        breweryNameandBeers.beers.push(beer.name);
    });

    res.status(200).json(breweryNameandBeers);
}

export default handler;