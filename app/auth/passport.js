var passport = require('passport');
var Database = require('../config/db');
var Users = require('../models/users');

module.exports = function() {
  passport.serializeUser( function(user, done) {
    done(null, user);
  });

  passport.deserializeUser( function(user, done) {
      done(null, user);
  });
};
