var Locations = require('../models/locations');

module.exports = {
  add(req, res) {
    res.render('location');
  },
  delete(req, res) {
    return Locations.forge({id: req.params.id}).destroy().then(function(model) {
      res.redirect('/locations/');
    });
  },
  edit(req, res) {
    if (req.params.id) {
      return Locations.forge({id: req.params.id}).fetch().then(function(location) {
        res.render('location', {results: location.attributes, errors: false});
      })
      .catch( function(error){console.log(error);} );
    } else {
      res.render('location');
    }
  },
  listAll(req, res) {
    return Locations.forge().orderBy('name', 'ASC').fetchAll().then(function(locations) {
      res.render('list', {results: locations.models, kind: 'locations', skipFields: ['id', 'phone', 'access', 'hours', 'email', 'latlong', 'created_at', 'updated_at']});
    })
    .catch( function(error){console.log(error);} );
  },
  single(req, res) {
    return Locations.forge({id: req.params.id}).fetch().then(function(location) {
      res.render('location', {results: location.attributes, errors: false});
    });
  },
  upsert(req, res) {
    var options = {};
    var placeID = '';
    if (!req.params.id) {
      options.method = 'insert';
    } else {
      placeID = {id: req.params.id};
      options.method = 'update';
      options.patch = 'true';
    }

    // Validate the input fields
    req.checkBody('placeName', 'The name or title of the place must not be empty.').notEmpty();
    req.checkBody('description', 'Description must not be empty').notEmpty();
    req.checkBody('email', 'Email must be valid.').optional({checkFalsy: true}).isEmail();

    var visibleness = '';
    if ( req.body.visible ) {
      visibleness = true;
    } else {
      visibleness = false;
    }
    if (req.file) {
      var pic = req.file.filename;
    }
    // SQL sanitizing happens in Postgres and knex level
    var values = {
      name: req.body.placeName,
      description: req.body.description,
      address: req.body.address,
      access: req.body.access,
      hours: req.body.hours,
      latlong: req.body.latlong,
      website: req.body.website,
      email: req.body.email,
      phone: req.body.phone,
      picture: pic,
      visible: visibleness
    };

    // Validation results
    req.getValidationResult().then(function(result) {
      if ( result.isEmpty() ) {
        return Locations.forge(placeID).save(values, options).then(function(ret) {
          if (!placeID) {
            placeID = {id: ret.id};
          }
          // After successful update/insert, grab the updated/new data and display the page
          res.redirect('/locations/edit/' + placeID.id);
        });
      } else {
        return Locations.forge(placeID).fetch().then(function(location) {
          res.render('location', {results: location.attributes, errors: result.array()});
        });

      }
    });  
  },
};
