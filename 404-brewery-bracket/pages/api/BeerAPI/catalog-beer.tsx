var base64 = require('base-64');
var BaseUrl = "http://api.catalog.beer";

// returns all beers from given brewery
export async function GetAllBeersFromGivenBrewery(req, res, breweryId){
    let url = BaseUrl + `/brewer/${breweryId}/beer`;
    let username = process.env.beerapikey;
    let password = "";

    let headers = new Headers();

    headers.append('Authorization', 'Basic ' + base64.encode(username+ ":" + password));

    res = await fetch(url, {method:'GET',
            headers: headers
        })
    .then(response => response.json())
    .then(data => {return data});

    console.log(res)

    var breweryNameandBeers = {name: res.brewer.name, beers: []};
    res.data.forEach(beer => {
        breweryNameandBeers.beers.push(beer.name);
    });

    return breweryNameandBeers;
}

// Gets all breweries names within a set distance of Perficient Dunwoody
export async function GetBreweriesNamesAndIds(req, res) {
    var lat = 33.932773841449226;
    var long = -84.33987288817255;

    let url = BaseUrl + `/location/nearby?latitude=${lat}&longitude=${long}&search_radius=1000&count=40 `;
    let username = process.env.beerapikey;
    let password = "";

    let headers = new Headers();

    headers.append('Authorization', 'Basic ' + base64.encode(username+ ":" + password));

    res = await fetch(url, {method:'GET',
            headers: headers
        })
    .then(response => response.json())
    .then(data => {return data});
    
    var breweryIdsAndNamesList = [];
    res.data.forEach(brewery => {
        breweryIdsAndNamesList.push({name: brewery.brewer.name, id: brewery.brewer.id});
    }); 

    console.log(breweryIdsAndNamesList)

    return breweryIdsAndNamesList;
};

