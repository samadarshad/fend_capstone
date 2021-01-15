require('dotenv').config()

const api_key = process.env.TEXT_API_KEY;
const base_url = process.env.TEXT_API_ENDPOINT;

const requests = require('./server-side-requests');
const messageScheme = require('../shared/messageScheme');

module.exports = {
    getSentimentData: async function (text) { 
        const message = new messageScheme().getMessage(text);
        if (message === undefined) {
            return Promise.reject(new Error(400));
        }
        const sentimentData = await getSentiment(message);
        return sentimentData;
    }
}

const getSentiment = async (text) => {
    const textUtf8 = Buffer.from(text, 'utf-8');
    const url = `${base_url}key=${api_key}&of=json&txt=${textUtf8}&lang=en`;
    const data = await requests.getData(url);
    console.log("Sentence evaluated: ", data.sentence_list[0].text);
    return data;
}