module.exports = {parse_json_for_brewery, parse_json_for_beer_name_array, remove_links_from_json}

function parse_json_for_brewery() {
    return
}

function parse_json_for_beer_name_array() {
    return
}

// Remove Name_links if the Name property 
// came from an anchor tag.
function remove_links_from_json(json) {
    let result = json.map(obj => {
        return {Name: obj.Name}
    }) 
    
    return result
}