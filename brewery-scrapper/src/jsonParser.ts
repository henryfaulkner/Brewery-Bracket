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

module.exports = {RemoveLinksFromJson}