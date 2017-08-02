var fs = require('fs');
var Database = require('../config/db');
var People = require('../models/people');

var locs = require('../helpers/getLocations');
var allLocs = locs.getLocations();

var picHelper = require('../helpers/pictureUploads');

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

    values.picture = picHelper.handlePicture(req.file, req.body.pic_name, req.body.del_pic);

    // SQL sanitizing happens in Postgres and knex level
    values.bio            = req.body.bio;
    values.email          = req.body.email;
    values.location_id    = req.body.location;
    values.moniker          = req.body.moniker;
    values.name           = req.body.fullname;
    values.office_address = req.body.office;
    values.office_hours   = req.body.hours;
    values.phone          = req.body.phone;
    values.website        = req.body.website;

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
