const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const {createStory} = require('./library/edenAi')

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
require('dotenv').config();

app.listen(3000, () => {
    console.log("Server is Listening on port 3000");
});

app.get('/', (req, res) => {
    res.send('story time');
});

app.post('/story', (req, res) => {

    createStory().then((data) => {
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(500).send('Something went wrong!');
    });
        
});