var Database = require('../config/db');

require('./tools');
require('./people');

var Locations = Database.Model.extend({
  tableName: 'Locations',
  hasTimestamps: true,
  tools: function() {
    return this.hasMany('Tools');
  },
  people: function() {
    return this.hasMany('People');
  }
});

module.exports = Database.model('Locations', Locations);
