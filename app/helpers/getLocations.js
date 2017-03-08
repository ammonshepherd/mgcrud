var Locations = require('../models/locations');

exports.getLocations = function() {
  var locArray = [];
  Locations.forge().orderBy('name', 'ASC').fetchAll().then(function(locs) {
      locs.models.forEach(function(ModelBase) {
          locArray.push(ModelBase.attributes.name);
      });
  });
  return locArray;
};
