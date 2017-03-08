let Database = require('../config/db');

require('./categories');
require('./locations');

var Tools = Database.Model.extend({
  tableName: 'Tools',
  hasTimestamps: true,
  categories: function() {
    return this.belongsTo('Categories');
  },
  locations: function() {
    return this.belongsTo('Locations');
  }
});

module.exports = Database.model('Tools', Tools);
