var bcrypt = require('bcrypt');
var Database = require('../config/db');
var Users = require('../models/users');
var passport = require('../auth/local');

module.exports = {

  adminRequired(req, res, next) {
    if (!req.user) {
      console.log(req.user + ' not logged in');
      res.status(401);
    }
    return Users.forge({username: req.user.username}).then(function(user) {
      if (!user.admin) {
        console.log('logged in as ' + user + ' but not admin');
        res.status(401);
        return next();
      }
    })
    .catch( function(err) {
      console.log('error checking for admin');
    });
  },

  comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
  },

  createUser (req) {
    if(req.body.password === req.body.confirmpassword) {
      console.log('passwords match');
      var username = req.body.username;
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        console.log('create user in db');
        return Users.forge({username: username, password: hash}).save();
      });
    } else {
      console.log("passwords DON'T mAtch");
    }
  },

  isLoggedIn(req, res, next) {
    if (req.user) {
      console.log('already logged in as ' + req.user);
      next();
    }
    console.log('not logged in ' + req.body.username);
    next();
  },

  loginRequired(req, res, next) {
    if (!req.user) {
      console.log(req.user + ' not logged in');
      res.redirect('/login');
    }  
    console.log(req.user + ' is logged in');
    return next();
  },

  register(req, res, next) {
    console.log('register form submitted');
    return this.createUser(req, res)
    .then(function(response) {
      passport.authenticate('local', function(err, user, info) {
        console.log('success from register user form');
      })(req, res, next);
    })
    .catch(function(err) { console.log('error from register form: ' + err ); });
  },

  userExists(req, res, next) {
    console.log('check if user exists ' + req.body.username);
    return Users.where({username: req.body.username}).fetch().then(function(user) {
      if(user){
        console.log('username taken ' + user);
        res.render('register', {values: req.body, taken: 'Username is taken'});
      } else {
        console.log('username not taken ' + req.body.username);
        next();
      }
    })
    .catch(function(err) {
    });
  }

};
