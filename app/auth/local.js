var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Database = require('../config/db');
var Users = require('../models/users');
var init = require('./passport');
var auth = require('../controllers/auth');

init();

passport.use(new LocalStrategy(function(username, password, done) {
  Users.forge({username: username}).fetch()
  .then(function(user) {
    if (!user) {
      return done(null, false);
    }

    if (!comparePass(password, user.attributes.password)) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
  .catch(function(err) {
    return done(err);
  });
}));

function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
  }

module.exports = passport;
