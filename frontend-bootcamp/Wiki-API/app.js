const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const passwords = require(__dirname + "/password.js");

const password = passwords.getPassword();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

// mongoose.connect(`mongodb+srv://felipealisboa:${password}@cluster0-fqbok.mongodb.net/wikiDB`, {
mongoose.connect(`mongodb://localhost:27017/wikiDB`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log("DB Connected");
    })
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")

    .get((req, res) => {

        Article.find({}, (err, articles) => {
            if (err) {
                console.log(err);
            } else {
                res.send(articles);
                // res.render("article", {
                //     title: articles.title,
                //     content: articles.content
                // })
            }
        });
    })

    .post((req, res) => {
        const articleTitle = req.body.newTitle;
        const articleContent = req.body.newContent;

        const article = new Article({
            title: articleTitle,
            content: articleContent
        });

        article.save(err => {
            if (err) {
                console.log(err);
            } else {
                res.send("article saved succesfully");
            }
        })
        res.redirect("/articles");
    })

    .delete((req, res) => {
        Article.deleteMany({}, (err) => {
            if (!err) {
                res.send("Successfully delete all articles.");
            } else {
                res.send(err);
            }
        });
    });

app.route("/articles/:articleTitle")

    .get((req, res) => {
        Article.findOne({
            title: req.params.articleTitle
        }, (err, response) => {
            if (response) {
                res.send(response);
            } else {
                res.send("No matching title name");
            }
        });
    })

    .put((req, res) => {
        Article.update({
                title: req.params.articleTitle
            }, {
                title: req.body.title,
                content: req.body.content
            }, {
                overwrite: true
            },
            ((err) => {
                if (!err) {
                    res.send("Updated successfuly");
                }
            }));
    })

    .patch((req, res) => {
        Article.updateOne({
                title: req.params.articleTitle
            }, {
                $set: req.body
            },
            (err) => {
                if (!err) {
                    res.send("Succefully update!");
                } else {
                    res.send(err);
                }
            }
        );
    })

    .delete((req, res) => {
        Article.deleteOne({
            filter: {title: req.params.articleTitle}
        }, err => {
            if (!err) {
                res.send("Delete successfully!");
            } else {
                res.send(err);
            }
        });
    });

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});