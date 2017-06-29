var bcrypt = require('bcryptjs');
var Database = require('../config/db');
var Users = require('../models/users');
var passport = require('../auth/local');

module.exports = {

  adminRequired(req, res, next) {
    if (!req.user) {
      res.status(401);
    }
    return Users.forge({username: req.user.username}).then(function(user) {
      if (!user.admin) {
        res.status(401);
        return next();
      }
    })
    .catch( function(err) {
    });
  },

  isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) {
      next();
    } else {
      res.redirect('/login');
    }
  },

  register(req, res, next) {
    if(req.body.password === req.body.confirmpassword) {
      // Should run some validation on these
      var username = req.body.username;
      var email = req.body.email;
      var fullname = req.body.fullname;

      bcrypt.hash(req.body.password, 10, function(err, hash) {
        return Users.forge({fullname: fullname, email: email, username: username, password: hash}).save().then(function(user) {
          req.login(user.attributes, function(err) {
            if (err) { return next(err); }
            return res.redirect('/users/' + req.user.username);
          });
        });
      });
    } else {
      res.render('register', {values: req.body, passes: true});
    }
  },

  userExists(req, res, next) {
    return Users.where({username: req.body.username}).fetch().then(function(user) {
      if(user){
        res.render('register', {values: req.body, taken: true});
      } else {
        next();
      }
    })
    .catch(function(err) {
    });
  }

};
