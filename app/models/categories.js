var Database = require('../config/db');

require('./tools');

var Categories = Database.Model.extend({
  tableName: 'Categories',
  hasTimestamps: true,
  tools: function() {
    return this.hasMany(Tools);
  }
});

module.exports = Database.model('Categories', Categories);
