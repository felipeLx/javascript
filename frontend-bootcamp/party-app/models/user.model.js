const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true},
    googleId: {type: String},
    phone: {type: String, require: true},
    neighborhood: {type: String, require: true},
    city: {type: String, require: true},
    path: {type: String, require: true},
    businessType: {type: String, require: true},
    picture: {type: [], require: false},
    description: {type: String, require: true},
  });

var options = {
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password or username are incorrect',
        IncorrectUsernameError: 'Password or username are incorrect',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'A user with the given username is already registered'
    }
};

userSchema.plugin(passportLocalMongoose,options);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

mongoose.set("useCreateIndex", true);
  
passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET,
  callbackURL: '/auth/google/register',
  userProfileURL: 'https://googleapis.com/oauth2/v3/userinfo'
},
(acessToken, refreshToken, profile, cb) => {
  User.findOrCreate({googleId: profile.id}, (err, user) => {
    return cb(err, user);
    });
  }
));

module.exports = User;