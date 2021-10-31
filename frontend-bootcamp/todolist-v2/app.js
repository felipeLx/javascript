//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");


const passwords = require(__dirname + "/password.js");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const password = passwords.getPassword();

mongoose.connect(`mongodb+srv://felipealisboa:${password}@cluster0-fqbok.mongodb.net/todolistDB`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const itemOne = new Item({
  name: "Study"
});
const itemTwo = new Item({
  name: "Rest"
});
const itemThree = new Item({
  name: "Clean"
});

const defaultItens = [itemOne, itemTwo, itemThree];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {

  Item.find({}, (err, itemsResult) => {
    if (itemsResult.length === 0) {
      Item.insertMany(defaultItens, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default item to DB.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: itemsResult
      });
    }
  });
});

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName );

  List.findOne({name: customListName}, (err, foundList) => {
    if (!err) {
      console.log("Item founded");
      if (!foundList) {
        //create new list
        const list = new List({
          name: customListName,
          items: defaultItens
        });
        list.save();
        console.log("new item saved successfully")
        res.redirect("/" + customListName);
      } else {
        //show existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
    }
  });
});

app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  });

  if(listName === "Today") {  
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, (err, foundList) => {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName); 
    })
  } 
  
});

app.post("/delete", (req, res) => {

  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, err => {
      if (!err) {
        console.log("Delete succesfull");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, (err, foundList) => {
      if(!err) {
        res.redirect("/" + listName);
      }
    });
  }

  
});

app.get("/about", function (req, res) {
  res.render("about");
});

let port = process.env.PORT;
if(port == null || port == "") {
  port = 3000;
}

app.listen(port,() => {
  console.log(`Server started on port: ${port}`);
});