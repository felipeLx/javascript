require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const {json} = require("body-parser");
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const path = require('path');
// const usersRouter = require('./routes/userRoutes');
const usersRouter = require('./routes/routes');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(json());
app.use(cors());
app.use('/', usersRouter);

// if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, 'client/public')));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
  console.log("DB Connected");
})
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`);
})