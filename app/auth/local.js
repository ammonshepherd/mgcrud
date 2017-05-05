var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Database = require('../config/db');
var Users = require('../models/users');
var init = require('./passport');
var auth = require('../controllers/auth');

var options = {};

init();

passport.use(new LocalStrategy(options, function(username, password, done) {
  Users.forge({username: username}).fetch()
  .then(function(user) {
    if (!user) {
      return done(null, false);
    }

    if (!auth.comparePass(password, user.password)) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
  .catch(function(err) {
    return done(null, false);
  });
}));

module.exports = passport;
