var Database = require('../config/db');

var Tools = require('../models/tools');

var Categories = Database.Model.extend({
  tableName: 'Categories',
  hasTimestamps: true,
  tools: function() {
    return this.hasMany(Tools);
  }
});

module.exports = Categories;
