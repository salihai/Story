const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const {createStory} = require('./library/edenAi')

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
require('dotenv').config();

app.listen(8000, () => {
    console.log("Server is Listening on port 8000");
});

app.get('/', (req, res) => {
    res.send('story time');
});

app.post('/story', (req, res) => {

    let option = req.body.option;
    let prompt = req.body.prompt;
    let history = req.body.history;
    let words = req.body.words;

    createStory(option, words, prompt, history).then((data) => {
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(500).send('Something went wrong!');
    });
        
});