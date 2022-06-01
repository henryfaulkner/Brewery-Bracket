const axios = require("axios")
const cheerio = require("cheerio")
const jp = require("./JsonParser.ts")

/**
 * Scraps beer data from Untappd brewery pages.
 * @param brewery 
 * @returns an array of json objects
 */
async function ScrapPage(brewery: string) {
    let jsons: {}[] = [];

    await axios(`https://untappd.com/${brewery}/beer?sort=most_popular`)
        .then(({ data }) => {
            const $ = cheerio.load(data);
            const beerNames = FindBeerNames($);
            const beerStyles = FindBeerStyles($);
            const abvs = FindABVs($);
            const ibus = FindIBUs($);
            jsons = jp.ConstructBeerJsons(beerNames, beerStyles, abvs, ibus)
        });

    return jsons;
}

function FindBeerNames($) {
    return $('.beer-details > .name > a') // Select pagination links 
            .map((_, a) => $(a).text()) // Extract the href (url) from each link 
            .toArray(); // Convert cheerio object to array
}

//non-unique 
function FindBeerStyles($) {
    return $('.beer-details > .style') // Select pagination links 
            .map((_, p) => $(p).text()) // Extract the href (url) from each link 
            .toArray(); // Convert cheerio object to array
}

function FindABVs($) {
    return $('.details > .abv')
            .map((_, div) => $(div).text().replace("\n", "").replace("ABV", "").trim())
            .toArray();
}

function FindIBUs($) {
    return $('.details > .ibu')
            .map((_, div) => $(div).text().replace("\n", "").replace("IBU", "").trim())
            .toArray();
}

module.exports = {ScrapPage}