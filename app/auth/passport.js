var passport = require('passport');
var Database = require('../config/db');
var Users = require('../models/users');

module.exports = function() {
  passport.serializeUser( function(user, done) {
    done(null, user);
  });

  passport.deserializeUser( function(id, done) {
    return Users.forge({id: id}).fetch()
    .then(function(user) {
      done(null, user);
    })
    .catch(function(err) {
      done(err, user);
    });
  });
};
