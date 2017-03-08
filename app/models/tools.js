var Database = require('../config/db');

require('./locations');
require('./categories');

var Tools = Database.Model.extend({
  tableName: 'Tools',
  hasTimestamps: true,
  categories: function() {
    return this.belongsTo('Categories', 'category_id');
  },
  locations: function() {
    return this.belongsTo('Locations', 'location_id');
  }
});

module.exports = Database.model('Tools', Tools);
