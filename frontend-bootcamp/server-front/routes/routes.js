const express = require("express");
const router = require('express').Router();
const session = require("express-session");
const passport = require("passport");
const path = require('path');
const ObjectID = require("mongodb").ObjectId;
const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRegisterInput = require("../register/register");
const validateLoginInput = require("../register/login");

let User = require('../models/user.model');

router.route('/').get(async(req, res) => {
    await res.render("index")
        .then(res => console.log(res))
        .catch(err => console.log(err));
});
  
router.route("/auth/google").get((req, res) => {
    passport.authenticate('google', {scope: ["profile"]})
});
  
router.route("/auth/google/register").get((req, res) => {
    passport.authenticate('google', { failureRedirect: "/login"}),
    res.redirect(`/`); 
});
  
router.route('/users').get(async(req, res) => {
    console.log('render users');
    
    await User.find({}, (err, users) => {
        if(err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        if(!users.length) {
            return res.status(400).json({
                success:false,
                error: 'Users not found'
            })
        }

        return res.status(200).json({
            success: true,
            data: users
        })
    })
});

  
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

router.route(`/register/:id`).get(async(req,res) => {
    console.log(`get register id: ${req.params.id}`);
    
    await User.findById({_id: req.params.id}, (err, user) => {
        if(err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        if(!user) {
            return res.status(400).json({
                success: false,
                error: 'User not found'
            })
        }
        return res.status(200).json({
            success: true,
            data: user
        })
    })
    .catch(err => console.log(err));
});


router.route(`/:id`).get(async(req,res) => {
    console.log(`open detail from the user: ${req.params.id}`);
    await User.findById(req.params.id, (err, user) => {
        if(err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        if(!user) {
            return res.status(400).json({
                success: false,
                error: 'User not found'
            })
        }
        return res.status(200).json({
            success: true,
            data: user
        })
    })
    .catch(err => console.log(`Error route /:id => ${err}`));
});

router.route('/login').post(async(req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(`not pass validation: ${errors}`);
  }
  const username = req.body.username;
  const password = req.body.password;
// Find user by email
  User.findOne({ username }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username
        };
// Sign token
        jwt.sign(
          payload,
          process.env.SECRET,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.route('/auth').post(async(req, res) => {
    console.log('post auth request');
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    
    let newUser = '';

    User.findOne({username: req.body.username})
        .then(user => {
            if(user) {
                return res.status(400).json({email: 'Username already exist'})
            } else {
                newUser = new User({
                    username: req.body.username,
                    password: req.body.password
                });
            };
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) {
                        throw err;
                    } else {
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    };
                });
            });
        });
});
    
router.route(`/register/:id`).post(async(req, res) => {
    console.log('Update put request');
    
    User.findById(req.params.id, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                err,
                message: 'user not found',
            })
        }
        
        user.name = req.body.name;
        user.description = req.body.description;
        user.city = req.body.city;
        user.neighborhood = req.body.neighborhood;
        user.phone = req.body.phone;
        user.businessType = req.body.businessType;
        // user.picture = req.body.picture;
        user.save()
                .then(() => { 
                    return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated',
                })
            })
            .catch(err => {
                return res.status(400).json({
                err,
                message: 'User not updated!'
                })
            });
    })        
});
  
router.route(`/register/:id`).delete(async(req, res) => {

    await User.findByIdAndRemove({_id: req.params.id}, (err, user) => {
        if(err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        } 
        
        if(!user) {
            return res.status(400).json({
                success: false,
                error: 'User not found!'
            })
        }
        
        return res.status(200).json({
            success: true,
            data: user
        })
    })
});

module.exports = router;