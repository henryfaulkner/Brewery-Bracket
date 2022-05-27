/** 
* Remove Name_links if the Name property 
* came from an anchor tag.
* @param JSON[] Json array from scrapped file
* @returns Json array with Name as only property
*/
function RemoveLinksFromJson(json) {
    let result = json.map(obj => {
        return {Name: obj.Name}
    }) 
    
    return result
}

module.exports = {RemoveLinksFromJson}