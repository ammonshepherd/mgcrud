var Database = require('../config/db');

var Locations = require('../models/Locations');

var People = Database.Model.extend({
  tableName: 'People',
  hasTimestamps: true,
  locations: function() {
    return this.belongsTo(Locations);
  }
});

module.exports = People;
