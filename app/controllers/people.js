var People = require('../models/people');

module.exports = {
  add(req, res) {
    res.render('person');
  },
  delete(req, res) {
    return People.forge({id: req.params.id}).destroy().then(function(model) {
      res.redirect('/people/');
    });
  },
  edit(req, res) {
    if (req.params.id) {
      return People.forge({id: req.params.id}).fetch().then(function(person) {
        res.render('person', {results: person.attributes, errors: false});
      })
      .catch( function(error){console.log(error);} );
    } else {
      res.render('person');
    }
  },
  listAll(req, res) {
    return People.forge().fetchAll().then(function(people) {
      res.render('list', {results: people.models, kind: 'people', skipFields: ['id', 'created_at', 'updated_at']});
    })
    .catch( function(error){console.log(error);} );
  },
  single(req, res) {
    return People.forge({id: req.params.id}).fetch().then(function(person) {
      res.render('person', {results: person.attributes, errors: false});
    });
  },
  upsert(req, res) {
    var options = {};
    var placeID = '';
    if (!req.body.id) {
      options.method = 'insert';
    } else {
      placeID = {id: req.body.id};
      options.method = 'update';
      options.patch = 'true';
    }

    // Validate the input fields
    req.checkBody('personName', 'The name or title of the place must not be empty.').notEmpty();
    req.checkBody('title', 'Description must not be empty').notEmpty();
    req.checkBody('email', 'Email must be valid.').optional({checkFalsy: true}).isEmail();

    // SQL sanitizing happens in Postgres and knex level
    var values = {
      name: req.body.personName,
      title: req.body.title,
      email: req.body.email,
      phone: req.body.phone
    };

    // Validation results
    req.getValidationResult().then(function(result) {
      if ( result.isEmpty() ) {
        return People.forge(placeID).save(values, options).then(function(ret) {
          if (!placeID) {
            placeID = {id: ret.id};
          }
          // After successful update/insert, grab the updated/new data and display the page
          console.log('/people/edit/' + placeID.id);
          res.redirect('/people/edit/' + placeID.id);
          /*
          return People.forge(placeID).fetch().then(function(person) {
            res.render('person', {results: person.attributes, errors: false});
          });
          */
        });
      } else {
        return People.forge(placeID).fetch().then(function(person) {
          res.render('person', {results: person.attributes, errors: result.array()});
        });

      }
    });  
  },
};
