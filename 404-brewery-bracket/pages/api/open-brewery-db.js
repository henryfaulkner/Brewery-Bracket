// Gets all breweries names within a set distance of Perficient Dunwoody
export default async function GetBreweriesNamesFromGeo() {
    var lat = 33.932773841449226;
    var long = -84.33987288817255;

    var res = await fetch(`https://api.openbrewerydb.org/breweries?by_dist=${lat},${long}&per_page=40`)
                    .then(response => response.json())
                    .then(data => {return data});
    
    var breweryNamesList = [];
    res.forEach(brewery => {
        breweryNamesList.push(brewery.name);
    });

    return breweryNamesList;
};