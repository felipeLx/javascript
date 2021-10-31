const express = require("express");
const https = require("https");
const axios = require("axios");
const bodyParser = require("body-parser");
// const key = require("./keys");

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    console.log(req.body.cityName);
    const key = "92b3106c3e65a153964c760a41a887c9";
    const query = req.body.cityName;
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=${unit}`;
    try {
        https.get(url, (response) => {
            console.log(response.statusCode);
            response.on("data", (data) => {
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                res.write(`<h1>The temp in ${query} is: ${temp} Celcius.</h1>`);
                res.write(`<p>Wheather description: ${description}</p>`);
                res.write(`<img src=${imageURL} alt="">`);
                res.send();
            })
        });
    } catch (err) {
        console.log(err.message);
    }
});


app.listen(3000, () => {
    console.log("server in the port 3000");
});