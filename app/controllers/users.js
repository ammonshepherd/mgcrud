var bcrypt = require('bcrypt');
var Database = require('../config/db');
var Users = require('../models/users');
var passport = require('passport');


module.exports = {
  single(req, res) {
    return Users.forge({username: req.params.user}).fetch().then(function(user) {
      res.render('users', {userInfo: user.attributes});
    });
  },

  update(req, res) {
    var values = {
      email: req.body.email,
    };
    if (req.body.password && req.body.confirmpassword) { 
      if(req.body.password === req.body.confirmpassword) {
        // use sync rather than async
        values.password = bcrypt.hashSync(req.body.password, 10);
      } else {
        return res.render('users', {userInfo: req.user, error: 'Passwords do not match.'});
      }
    }

    return Users.forge({id: req.user.id}).save(values, {patch: true}).then(function(user) {
      Users.forge({id: req.user.id}).fetch().then(function(user) {
        var userObj = user.attributes;
        // reset the session values
        req.login(userObj, function(err) {
          if(err) return next(err);
        });
        res.end();
      }).then(function() {
        // call this after the above.
        res.redirect('/users/' + req.user.username);
      });
    });

  }
};
