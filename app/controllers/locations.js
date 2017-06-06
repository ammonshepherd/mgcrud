var fs = require('fs');
var Locations = require('../models/locations');

module.exports = {
  add(req, res) {
    res.render('location');
  },
  delete(req, res) {
    Locations.forge({id: req.params.id}).fetch().then(function(location) {
        if(location.attributes.picture) {
          fs.unlink('./app/public/uploads/' + location.attributes.picture, function(err) {
            if (err) console.log(err);
            return Locations.forge({id: req.params.id}).destroy().then(function(model) {
              res.redirect('/locations/');
            })
            .catch(function(error) {
              res.render('error', {error: error, message: 'Can not delete.', title: 'Locations'});
            });
          });
        }
    });
  },
  edit(req, res) {
    if (req.params.id) {
      return Locations.forge({id: req.params.id}).fetch().then(function(location) {
        res.render('location', {results: location.attributes, errors: false, message: false, title: 'Locations'});
      })
      .catch( function(error){
        res.render('error', {error: error, title: 'Locations'});
      });
    } else {
      res.render('location', {title: 'Locations'});
    }
  },
  listAll(req, res) {
    return Locations.forge().orderBy('name', 'ASC').fetchAll().then(function(locations) {
      res.render('locations-list', {results: locations.models, kind: 'locations', title: 'Locations'});
    })
    .catch( function(error){
      res.render('error', {error: error});
    });
  },
  single(req, res) {
    return Locations.forge({id: req.params.id}).fetch().then(function(location) {
      res.render('location', {results: location.attributes, errors: false, title: 'Locations'});
    });
  },
  upsert(req, res) {
    var options = {};
    var placeID = '';
    var message = '';
    if (!req.params.id) {
      options.method = 'insert';
      message = "Created Successfully!";
    } else {
      placeID = {id: req.params.id};
      options.method = 'update';
      options.patch = 'true';
      message = 'Updated Successfully!';
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
      visible: visibleness
    };

    if (req.file) {
      values.picture = req.file.filename;
      // Delete existing pic if there is one
      if(req.body.pic_name) {
        fs.unlink('./app/public/uploads/' + req.body.pic_name, function(err) {
          if (err) console.log(err); 
        });

      }
    }

    // Validation results
    req.getValidationResult().then(function(result) {
      if ( result.isEmpty() ) {
        return Locations.forge(placeID).save(values, options).then(function(location) {
          res.render('location', {results: location.attributes, message: message});
        });
      } else {
        if (placeID !== '') {
          return Locations.forge(placeID).fetch().then(function(location) {
            res.render('location', {results: location.attributes, errors: result.array(), title: 'Locations'});
          });
        } else {
          res.render('location', { errors: result.array(), title: 'Locations' });
        }

      }
    });  
  },
};
