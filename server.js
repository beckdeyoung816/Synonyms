var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;
const axios = require('axios');

// Use body-parser middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const thesaurus_api = async(word) => {
    const options = {
    method: 'GET',
    url: 'https://thesaurus-by-api-ninjas.p.rapidapi.com/v1/thesaurus',
    params: {word: 'bright'},
    headers: {
        'X-RapidAPI-Key': process.env.THESAURUS_API_KEY,
        'X-RapidAPI-Host': 'thesaurus-by-api-ninjas.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }

}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', function(req, res) {
    res.send('Hello World!');})

app.get('/synonyms/', async function(req, res) {  
    const word = req.params.word;
    console.log(word);
    const synonyms = await thesaurus_api(word);
    res.send(synonyms);
});