var express = require('express');
var router = express.Router();
var passport = require("passport");
var bcrypt = require("bcrypt-nodejs");
var UserModel = require("../models/UserModel");

router.get("/login", function(req, res, next){
  if(req.isAuthenticated()){
    res.redirect("/");
  } else {
    res.render("login");
  }
})

router.post("/login", passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), function(req, res){
  res.redirect("/");
});

router.get("/register", function(req, res, next){
  if(req.isAuthenticated()){
    res.redirect("/");
  } else{
    res.render("register");
  }
});

router.post("/register", function(req, res, next){
  UserModel.findOne({username: req.body.username.toLowerCase()})
    .exec()
    .then(user => {

      if(user){
        req.flash("error", "username already in use");
        return res.redirect("/register");
      }

      if(req.body.password.length <= 5){
        req.flash("error", "password must be at least 6 characters");
        return res.redirect("/register");
      }

      bcrypt.hash(req.body.password, null, null, function(err, hash){
        user = new UserModel({
          username: req.body.username.toLowerCase(),
          password: hash
        });

        user
          .save()
          .then(user => {
            req.login(user, err => {
              if(err){
                return res.redirect("/register");
              }

              return res.redirect("/");
            });
          })
          .catch(err => {
            req.flash("error", error.message);
            res.redirect("/register");
          });
      });
    })
    .catch(err => {
      return next(err);
    });
});

router.post("/logout", function(req, res){
  req.logout();
  res.redirect("/login");
});

router.get('/', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect("/login");
  } else{
    res.render('index', {
      title: "Express",
      username: req.user.username
    });
  }
});

module.exports = router;
