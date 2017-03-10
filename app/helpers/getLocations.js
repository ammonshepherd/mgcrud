var Locations = require('../models/locations');

exports.getLocations = function() {
  var locArray = [];
  //var locObj = {};
  Locations.forge().orderBy('name', 'ASC').fetchAll().then(function(locs) {
      locs.models.forEach(function(ModelBase) {
          locArray.push({id: ModelBase.attributes.id, name: ModelBase.attributes.name});
          //locObj[ModelBase.attributes.id] = ModelBase.attributes.name;
      });
  });
  return locArray;
  //return locObj;
};
