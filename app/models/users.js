var Database = require('../config/db');

var Users = Database.Model.extend({
  tableName: 'Users',
  hasTimestamps: true,
});

module.exports = Users;
