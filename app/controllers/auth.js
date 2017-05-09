var bcrypt = require('bcrypt');
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
    if (!req.user) {
      return next();
    }
    req.locals.user = req.user.attributes;
    next();
  },

  loginRequired(req, res, next) {
    if (!req.user) {
      res.redirect('/login');
    }  
    return next();
  },

  register(req, res, next) {
    if(req.body.password === req.body.confirmpassword) {
      // Should run some validation on these
      var username = req.body.username;
      var email = req.body.email;

      bcrypt.hash(req.body.password, 10, function(err, hash) {
        return Users.forge({email: email, username: username, password: hash}).save().then(function(user) {
          req.login(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/users/' + req.user.attributes.username);
          });
        });
      });
    } else {
    }
  },

  userExists(req, res, next) {
    console.log('check if user exists ' + req.body.username);
    return Users.where({username: req.body.username}).fetch().then(function(user) {
      if(user){
        res.render('register', {values: req.body, taken: 'Username is taken'});
      } else {
        next();
      }
    })
    .catch(function(err) {
    });
  }

};
