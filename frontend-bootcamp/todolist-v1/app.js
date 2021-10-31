const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}) );
app.use(express.static("public"));

const newItems = ["buy food", "cook food", "eat food"];
const workItems = [];

app.get("/", (req, res) => {
   const day = date.getDate();

    res.render("list", {
        listTitle: day,
        newListItems: newItems
    });
});

app.post("/", (req, res) => {
    let newItem = req.body.newItem;

    if(req.body.list === "Work") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        newItems.push(newItem);
        res.redirect("/");
    }
    
});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.listen(process.env.PORT || 3000, () => {
    console.log("listen in port 3000");
})