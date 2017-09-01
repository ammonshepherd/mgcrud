var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var Database = require('../config/db');
var Users = require('../models/users');
var passport = require('../auth/local');
var mailer = require('../helpers/mailer');

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

  emailExists(req, res, next) {
    return Users.where({email: req.body.email}).fetch().then(function(user) {
      if(user){
        res.render('register', {values: req.body, emailTaken: true});
      } else {
        next();
      }
    })
    .catch(function(err) {
      console.log(err);
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

  resetPass(req, res, next) {
    Users.query({where: {username: req.body.username}, orWhere: {email: req.body.username}}).fetch().then(function(user) {
      var buf = crypto.randomBytes(12).toString('hex');
      bcrypt.hash(buf, 10, function(err, hash) {
        return Users.forge({id: user.attributes.id}).save({password: hash}, {patch: true}).then(function(resetuser) {
          if (err) { return next(err); }
          var message = 'Your password has been reset to: ' + buf + '\n\n Please log in to http://sfm.lib.virginia.edu to reset the password.'
          var mailOptions = {
            from: 'makergrounds@virginia.edu',
            to: user.attributes.email,
            subject: 'Reset password',
            text: message
          };

          mailer.sendMail(mailOptions, function(error, info) {
            if(error) {
              return res.render('reset', {message: 'Problem sending message to ' + user.attributes.email, error: error});
            } else {
              return res.render('login', {message: 'An email with new password was sent to ' + user.attributes.email});
            }
          });

        });
      });
    }).catch(function(err) {
      res.render('login', {error: err});
    });
  },

  userExists(req, res, next) {
    console.log(req.body);
    return Users.where({username: req.body.username}).fetch().then(function(user) {
      if(user){
        res.render('register', {values: req.body, userTaken: true});
      } else {
        next();
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  }

};
