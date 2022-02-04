import { NextApiRequest, NextApiResponse } from 'next';

type DataPoint = {
    name: string,
    id: string
}

type Data = {}

var base64 = require('base-64');
var BaseUrl = "http://api.catalog.beer";

// Gets all breweries names within a set distance of Perficient Dunwoody
const handler = async (req : NextApiRequest, res : NextApiResponse<Data>) => {
    var lat = 33.932773841449226;
    var long = -84.33987288817255;

    let url = BaseUrl + `/location/nearby?latitude=${lat}&longitude=${long}&search_radius=1000&count=40 `;
    let username = process.env.beerapikey;
    let password = "";

    let headers = new Headers();

    headers.append('Authorization', 'Basic ' + base64.encode(username+ ":" + password));

    var resData = await fetch(url, {method:'GET',
            headers: headers
        })
    .then(response => response.json())
    .then(data => {return data});
    
    var breweryIdsAndNamesList : Data[] = [];
    resData.data.forEach(brewery => {
        breweryIdsAndNamesList.push({name: brewery.brewer.name, id: brewery.brewer.id});
    }); 

    console.log(breweryIdsAndNamesList)

    res.status(200).json(breweryIdsAndNamesList);
};

export default handler;