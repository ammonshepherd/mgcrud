var fs = require('fs');
var bcrypt = require('bcrypt');
var Database = require('../config/db');
var Users = require('../models/users');


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
        res.render('user', {results: user.attributes, title: 'User Settings' });
      });
    } else {
      res.render('user', {title: 'Create User'});
    }
  },

  list(req, res) {
    return Users.forge().orderBy('username', 'ASC').fetchAll().then(function(users) {
      res.render('users-list', {results: users.models, title: 'Users'});
    })
    .catch(function(error) {
      res.render('error', {error: error});
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
        return res.render('user', {results: req.body, title: 'User Information', error: 'Passwords do not match.'});
      }
    }

    // Update the file name in the database
    if (req.file) {
      values.img = req.file.filename;
    } else {
      values.img = req.body.pic_name;
    }
      // Set the value in the db to null, and delete the file
    if (req.body.del_pic == 'on') {
      values.img = '';
      fs.unlink('./app/public/uploads/' + req.body.pic_name, function(err) {
        if (err) console.log(err);
      });
    }

    // Set remaining values
    values.email = req.body.email;
    values.fullname = req.body.fullname;

    return Users.forge(userID).save(values, options).then(function(user) {
      // If updating your own user account information, then reset the session informaion.
      if (req.body.username === req.user.username) {
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

      // otherwise just redirect to the list of users page
      } else {
        res.redirect('/users/');
      }

    });

  }
};
