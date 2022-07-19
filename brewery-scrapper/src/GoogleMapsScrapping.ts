import BreweryObject from "../Models/BreweryObject";

const SerpApi = require('google-search-results-nodejs');
require('dotenv').config();
const search = new SerpApi.GoogleSearch(process.env.SerpApiKey);
  
async function ScrapGooglePage(lat:number, long:number) {
    const params = {
        engine: "google_maps",
        q: "Brewery",
        google_domain: "google.com",
        ll: `@${lat}, ${long},14z`,
        type: "search",
        hl: "en"
      };

    const breweryJSONs = []
    for(let i = 0; i < 6; i++) {
        params["start"] = i * 20; // sets offsets for pagination
        await new Promise(resolve => {
            search.json(params, (data) => {
                for(let i = 0; i < data["local_results"].length; i++) {
                    breweryJSONs.push(new BreweryObject({
                        name: data["local_results"][i]["title"] ?? "",
                        Address: data["local_results"][i]["address"] ?? "",
                        Description: data["local_results"][i]["description"] ?? "",
                        Short_Description: "",
                        Facebook_Url: "",
                        Twitter_Url: "",
                        Instagram_Url: "",
                        Url: data["local_results"][i]["website"] ?? "",
                        UntappdBreweryUid: "",
                    }))
                };
                resolve(data);
            });
        })
    }
    return breweryJSONs;
}

module.exports = {ScrapGooglePage}