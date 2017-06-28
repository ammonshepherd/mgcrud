var fs = require('fs');
var Database = require('../config/db');
var People = require('../models/people');

var locs = require('../helpers/getLocations');
var allLocs = locs.getLocations();

module.exports = {
  delete(req, res) {
    People.forge({id: req.params.id}).fetch().then(function(person) {
      if (person.attributes.picture) {
        fs.unlink('./app/public/uploads/' + person.attributes.picture, function(err) {
          if (err) console.log(err);
        });
      }
      return People.forge({id: req.params.id}).destroy().then(function(model) {
        res.redirect('/people/');
      })
      .catch(function(error) {
        res.render('error', {error: error, message: 'Can not delete person.', title: 'People'});
      });
    });
  },

  edit(req, res) {
    if (req.params.id) {
      return People.forge({id: req.params.id}).fetch().then(function(person) {
        res.render('person', {results: person.attributes, title: 'People', errors: false, locations: allLocs});
      })
      .catch( function(error){console.log(error);} );
    } else {
      res.render('person', {locations: allLocs, title: 'People'});
    }
  },

  list(req, res) {
    var allPeople = Database.Collection.extend({model: People}); // Make a collection so we can use withRelated
    return allPeople.forge().orderBy('name', 'ASC').fetch({withRelated: ['location']}).then(function(people) {
      res.render('people', {results: people.models, title: 'People', locations: allLocs});
    })
    .catch( function(error){console.log(error);} );
  },

  upsert(req, res) {
    var options = {};
    var message = '';
    var personID = '';
    var values = {};
    if (req.body.newuser) {
      options.method = 'insert';
      message = 'Successfully Created Person';
      values.name = req.body.fullname;
    } else {
      personID = {id: req.body.id};
      options.method = 'update';
      options.patch = 'true';
      message = 'Updated Successfully!';
    }

    // Validate the input fields
    req.checkBody('fullname', 'The name field must not be empty.').notEmpty();
    req.checkBody('moniker', 'Title must not be empty').notEmpty();
    req.checkBody('email', 'Email must be valid.').optional({checkFalsy: true}).isEmail();

    // Update the file name in the database
    if (req.file) {
      values.picture = req.file.filename;
    } else {
      values.picture = req.body.pic_name;
    }
    // set the value in the db to null and delete the file
    if (req.body.del_pic == 'on') {
      values.picture = '';
      fs.unlink('./app/public/uploads/' + req.body.pic_name, function(err) {
        if (err) console.log(err);
      });
    }

    // SQL sanitizing happens in Postgres and knex level
    values.title = req.body.title;
    values.email = req.body.email;
    values.phone = req.body.phone;
    values.location_id = req.body.location;

    // Validation results
    req.getValidationResult().then(function(result) {
      if ( result.isEmpty() ) {
        return People.forge(personID).save(values, options).then(function(person) {
          res.render('person', {results: person.attributes, title: 'People', locations: allLocs, message: message});
        });
      } else {
        if (personID !== '') {
          return People.forge(personID).fetch().then(function(person) {
            res.render('person', {results: person.attributes, title: 'People', locations: allLocs, errors: result.array()});
          });
        } else {
          res.render('person', {title: 'People', locations: allLocs, errors: result.array() });
        }

      }
    });  
  },
};
