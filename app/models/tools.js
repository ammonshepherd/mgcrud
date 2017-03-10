var Database = require('../config/db');

require('./locations');
require('./categories');

var Tools = Database.Model.extend({
  tableName: 'Tools',
  hasTimestamps: true,
  category: function() {
    return this.belongsTo('Categories', 'category_id');
  },
  location: function() {
    return this.belongsTo('Locations', 'location_id');
  }
});

module.exports = Database.model('Tools', Tools);
