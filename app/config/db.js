// database connection
var knex = require('knex')({
  client: 'pg', 
  connection: {
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    database: 'mg-dev',
  }
});
var Database = require('bookshelf')(knex);

Database.plugin('registry');

module.exports = Database;

