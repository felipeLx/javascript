//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const {json} = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const FacebookStrategy = require("passport-facebook").Strategy;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(json());

app.use(session({
    secret: "Beatriz e minha filha.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(`mongodb://localhost:27017/userDB`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log("DB Connected");
    })
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
        email: String,
        password: String,
        googleId: String,
        facebookId: String,
        secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: [!"password"]})

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ googleId: profile.id }, (err, user) => {

        return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets",
    enableProof: true
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({facebookId: profile.id}, function(err, user) {
      if (err) { return done(err); }
      else {done(null, profile);}
    });
  }
));


// FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/auth/google",
    passport.authenticate('google', {scope: ["profile"]})
);

app.get("/auth/google/secrets", 
    passport.authenticate('google', { failureRedirect: "/login"}),
    (req, res) => {
        res.redirect("/secrets"); 
    })

app.get("/auth/facebook", 
passport.authenticate("facebook" )
);

app.get(
    "/auth/facebook/secrets",
    passport.authenticate("facebook", {
    failureRedirect: "/login"
      }),
      (req, res) => {
          res.redirect("/secrets");
      }
);

app.get("/fail", (req, res) => {
        res.send("Failed attempt");
      });

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/secrets", (req, res) => {
    User.find({"secret": {$ne:null}}, (err, foundUsers) => {
        if(err) {
            console.log(err);
        } else {
            if(foundUsers) {
                res.render("secrets", {usersWithSecrets: foundUsers});
            }
        }
    });
});

app.get("/submit", (req, res) => {
    if(req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

app.post("/register", (req, res) => {

    User.register({username: req.body.username}, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () =>{
                res.redirect("/secrets");
            })

        }
    });
});

app.post("/login", (req, res) => {
    const user = new User({
        username: req.body.userName,
        password: req.body.password
    });

    req.login(user, err => {
        if(err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            })
        }
    });
});

app.post("/submit", (req, res) => {
    const submittedSecret = req.body.secret;

    User.findById(req.user.id, (err, foundId) => {
        if(err) {
            console.log(err);
        } else {
            if(foundId) {
                foundId.secret = submittedSecret;
                foundId.save(() => {
                    res.redirect("/secrets");
                });
            }
        }
    });
});

app.listen(3000, err => {
    if(!err) {
        console.log("Listen on port 3000");
    } 
})
