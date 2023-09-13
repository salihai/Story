const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server is Listening on port 3000");
});

app.get('/', (req, res) => {
    res.send('story time');
});