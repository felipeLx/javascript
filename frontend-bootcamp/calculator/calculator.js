const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// urlencoded when we want to parser data from html
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
    console.log("listen on port 3000");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;
    res.send("Calculation result: " + result);
});

app.get("/bmicalculator", function(req, res) {
    res.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/bmicalculator", function(req, res) {
    let heigth = parseFloat(req.body.heigth);
    let weigth = parseFloat(req.body.weigth);

    let result = Math.floor(weigth / (heigth * heigth));
    res.send("Your BMI is " + result);
})