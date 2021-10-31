// jshint esversion:6
const express = require("express");

const app = express();

app.listen(3000, function() {
    console.log("server listen in the port 3000");
});

app.get("/", function(req, res) {
    res.send("<h1>Hello World</h1>");
});

app.get("/contact", function(req, res) {
    res.send("Contact me");
});

app.get("/about", function(req, res) {
    res.send("Who I am");
});