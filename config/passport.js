const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");

const User = require("../models/UserModel");

passport.use(new LocalStrategy(
  function(username, password, done){
    console.log("authentication started");
    User.findOne({username: username.toLowerCase()})
      .exec()
      .then(user => {
        console.log("user found");
        bcrypt.compare(password, user.password, (err, match) => {
          if(!match){
            console.log("incorrect password");
            return done(null, false, {message: "incorrect password"});
          }

          console.log("success");
          return done(null, user);
        });
      })
      .catch(err => {
        console.log("error");
        return done(err);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
