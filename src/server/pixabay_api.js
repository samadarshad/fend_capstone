require('dotenv').config()

const api_key = `19889319-b8f5448a5336428c663231efb`;//process.env.GEONAMES_USERNAME;
const base_url = `https://pixabay.com/api/`//process.env.GEONAMES_API_ENDPOINT;

const requests = require('./server-side-requests');

class pixabayApi {    

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
    
    getPictures = async function (searchTerm, numPictures) { 
        if (searchTerm === undefined) {
            return Promise.reject(new Error(400));
        }
        const pictureUrls = await this._getPictures(searchTerm, numPictures);
        return pictureUrls;
    }

    _getPictures = async function (searchTerm, numPictures) {
        const searchTermUtf8 = Buffer.from(searchTerm, 'utf-8');
        const url = `${base_url}?key=${api_key}&&q=${searchTermUtf8}&image_type=photo&per_page=${numPictures}`
        console.log(url)
        const response = await requests.getData(url);
        console.log(response)
        if (response.total == 0) {
            return Promise.reject(new Error(404));
        }
        const pictures = response.hits.map(picture => this.getJsonPicture(picture.webformatURL, picture.webformatHeight, picture.webformatWidth))
        return pictures;
    }
}

module.exports = pixabayApi