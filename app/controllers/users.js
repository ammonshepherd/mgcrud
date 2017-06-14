var fs = require('fs');
var bcrypt = require('bcrypt');
var Database = require('../config/db');
var Users = require('../models/users');


module.exports = {
  list(req, res) {
    return Users.forge().orderBy('username', 'ASC').fetchAll().then(function(users) {
      res.render('users-list', {results: users.models, title: 'Users'});
    })
    .catch(function(error) {
      res.render('error', {error: error});
    });
  }, 

  single(req, res) {
    return Users.forge({username: req.params.user}).fetch().then(function(user) {
      res.render('users', {userInfo: user.attributes, title: 'User Information'});
    });
  },

  update(req, res) {
    var values = {
      email: req.body.email,
      fullname: req.body.fullname,
    };
    // Reset the password, only if the fields are filled in
    if (req.body.password && req.body.confirmpassword) { 
      if(req.body.password === req.body.confirmpassword) {
        // use sync rather than async
        values.password = bcrypt.hashSync(req.body.password, 10);
      } else {
        return res.render('users', {userInfo: req.user, title: 'User Information', error: 'Passwords do not match.'});
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
