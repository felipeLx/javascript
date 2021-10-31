const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    console.log(req.body.cripto);
});

axios.get("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD",
 (error, response, body) => {
    console.log(response);
});

app.listen(3000, () => {
    console.log("Server is running in the port 3000");
});

