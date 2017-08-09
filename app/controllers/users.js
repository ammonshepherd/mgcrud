var fs = require('fs');
var bcrypt = require('bcryptjs');
var Database = require('../config/db');
var Users = require('../models/users');

var picHelper = require('../helpers/pictureUploads');

module.exports = {
  delete(req, res) {
    Users.forge({id: req.params.id}).fetch().then(function(user) {
      if(user.attributes.img) {
        fs.unlink('./app/public/uploads/' + user.attributes.img, function(err) {
          if (err) console.log(err);
        });
      }
      return Users.forge({id: req.params.id}).destroy().then(function(model) {
        res.redirect('/users/');
      })
      .catch(function(error) {
        res.render('error', {error: error, message: 'Can not delete users.', title: 'Users'});
      });
    });
  },

  edit(req, res) {
    if (req.params.user) {
      return Users.forge({username: req.params.user}).fetch().then(function(user) {
        res.render('user', {results: user.attributes, title: 'Users' });
      });
    } else {
      res.render('user', {title: 'Users'});
    }
  },

  list(req, res) {
    res.locals.userInfo.message = '';
    return Users.forge().orderBy('username', 'ASC').fetchAll().then(function(users) {
      res.render('users-list', {results: users.models, title: 'Users'});
    })
    .catch(function(error) {
      res.render('error', {title: 'Users', error: error});
    });
  }, 

  update(req, res) {
    var options = {};
    var message = '';
    var userID = '';
    var values = {};
    if (req.body.newuser) {
      options.method = 'insert';
      message = 'Successfully Created User';
      values.username = req.body.username;
    } else {
      userID = {id: req.body.id};
      options.method = 'update';
      options.patch = 'true';
      message = "Updated Successfully!";
    }

    // Reset the password, only if the fields are filled in
    if (req.body.password && req.body.confirmpassword) { 
      if(req.body.password === req.body.confirmpassword) {
        // use sync rather than async
        values.password = bcrypt.hashSync(req.body.password, 10);
      } else {
        return res.render('user', {results: req.body, title: 'Users', error: 'Passwords do not match.'});
      }
    }

    // Set remaining values
    values.email = req.body.email;
    values.fullname = req.body.fullname;
    values.img = picHelper.handlePicture(req.file, req.body.pic_name, req.body.del_pic);

    return Users.forge(userID).save(values, options).then(function(user) {
      // If updating your own user account information, then reset the session informaion.
      if (req.body.username === req.user.username) {
        Users.forge({id: req.user.id}).fetch().then(function(user) {
          var userObj = user.attributes;
          userObj.message = message;
          // reset the session values
          req.login(userObj, function(err) {
            if(err) return next(err);
          });
          res.end();
        }).then(function() {
          // call this after the above.
          res.redirect('/users/' + req.user.username);
        });

      // otherwise just redirect to the list of users page
      } else {
        res.redirect('/users/');
      }

    });

  }
};
