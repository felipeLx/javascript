const router = require('express').Router();
const session = require("express-session");
const passport = require("passport");
const path = require('path');
const ObjectID = require("mongodb").ObjectId;
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

let User = require('../models/user.model');

router.route('/').get((req, res) => {
    res.render("index");
    // User.find()
    // .then(users => res.json(users))
    // .catch(err => res.status(400).json(`Error: ${err}`))
})
  
router.route("/auth/google").get((req, res) => {
    passport.authenticate('google', {scope: ["profile"]})
});
  
router.route("/auth/google/register").get((req, res) => {
    passport.authenticate('google', { failureRedirect: "/login"}),
    res.redirect(`/`); 
});
  
router.route('/getlist').get((req, res) => {
    var list = [1,2,3,4,5];
    const customers = [
        {id: 1, name: "Casa Festa", img: "assets/img/cs_festa.jpg", description: "Somos a melhor casa de festa"}, 
        {id: 2, name: "Docinhos", img: "assets/img/serv.png", description: "Docinhos da vóvo"}, 
        {id: 3, name: "Loja para Festa", img: "assets/img/store.png", description: "Aqui encontra o que precisa."}, 
    ];
    res.send(customers);
    console.log('Sent list of customers');  
});
  
// router.route("/auth").get((req, res) => {
//     res.render("auth");
// });
  
router.route("/submit").get((req, res) => {
    if(req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/");
    }
});
    
router.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
});
    
router.route(`/register/:id`).get((req,res) => {
    console.log('get register id: ' + req.params.id);
    User.findById(req.params.id)
        .then(user => res.redirect('register/' + req.params.id))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/auth').post((req, res) => {
    console.log('post auth request');
    console.log(`username: ${req.body.username} \n password: ${req.body.password}`);
    
    let checkUser = req.body.username;
    
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    let databaseUser = newUser.findById(req.params.id);
    console.log(databaseUser);
    User.register({username: req.body.username}, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
        }
        else {passport.authenticate('local')(req, res, () => {
            newUser.save((err, result) => {
            //   newUser = result.id;
              console.log(result.id);})
              res.redirect('/');
            })};
    });
});
    
router.route(`/register/:id`).post((req, res) => {
    console.log('Update put request');
    console.log(req.params);
    let id = ObjectID(req.params.id).toString();
    
    User.findById(id, (err, user) => {
        if(!user) {
            res.status(400).send('data is not found!');
        } else {
            console.log(req.body);
            user.name = req.body.name;
            user.description = req.body.description;
            user.city = req.body.city;
            user.neighborhood = req.body.neighborhood;
            user.phone = req.body.phone;
            user.businessType = req.body.businessType;
            user.picture = req.body.picture;
    
            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        }
    })
});
  
router.route(`/register/:id`).delete((req, res,next) => {
    User.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if(err) {
            return next(err);
        } else {
            res.json(user);
          }
    })
});

module.exports = router;