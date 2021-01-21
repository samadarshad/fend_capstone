class pictureMessageScheme {
    getJsonPicture = function (url, height, width) {
        return {
             'url': url,
             'height': height,
             'width': width
        }
    }

    get_url = function (jsonData) {
        return jsonData.url
    }  
    get_height = function (jsonData) {
        return jsonData.height
    }
    get_width = function (jsonData) {
        return jsonData.width
    }

}; 

module.exports = pictureMessageScheme