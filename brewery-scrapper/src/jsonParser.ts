// Remove Name_links if the Name property 
// came from an anchor tag.
function RemoveLinksFromJson(json) {
    let result = json.map(obj => {
        return {Name: obj.Name}
    }) 
    
    return result
}

module.exports = {RemoveLinksFromJson}