var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Database = require('../config/db');
var Users = require('../models/users');
var init = require('./passport');
var auth = require('../controllers/auth');

var options = {};

init();

passport.use(new LocalStrategy(options, function(username, password, done) {
  console.log('pull info from DB if user exists');
  Users.forge({username: username}).fetch()
  .then(function(user) {
    if (!user) {
      console.log('username does not exist');
      return done(null, false, {message: "Incorrect Username"});
    }

    console.log('check passwords');
    if (!comparePass(password, user.attributes.password)) {
      return done(null, false, {message: "Incorrect Password"});
    } else {
      return done(null, user);
    }
  })
  .catch(function(err) {
    console.log('database error on login');
    return done(err);
  });
}));

function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
  }

module.exports = passport;
