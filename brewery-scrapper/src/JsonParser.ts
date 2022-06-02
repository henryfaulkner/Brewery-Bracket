/** 
* Remove Name_links if the Name property 
* came from an anchor tag.
* @param JSON[] Json array from scrapped file
* @returns Json array without Name_link properties
*/
function RemoveLinksFromJson(json) {
    let result = json.map(obj => {
        delete obj["Name_link"]
        return obj
    }) 
    
    return result
}

/**
 * 
 * @param beerNames 
 * @param beerStyles 
 * @param abvs 
 * @param ibus 
 * @returns an array of json objects
 */
function ConstructBeerJsons(beerNames: string[], beerStyles: string[], abvs: string[], ibus: string[]) {
    let jsons: {}[] = []

    for(let i = 0; i < beerNames.length; i++) {
        const json = {
            "Name": beerNames[i],
            "Style": beerStyles[i],
            "ABV": abvs[i],
            "IBU": ibus[i]    
        }
        jsons.push(json);
    }

    return jsons;
}

module.exports = {RemoveLinksFromJson, ConstructBeerJsons}