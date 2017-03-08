var Database = require('../config/db');

require('./locations');

var People = Database.Model.extend({
  tableName: 'People',
  hasTimestamps: true,
  locations: function() {
    return this.belongsTo('Locations');
  }
});

module.exports = Database.model('People', People);
