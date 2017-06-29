// Get .env values here, this runs before they are set in server.js
require('dotenv').config();

// database connection
var knex = require('knex')({
  client: 'pg', 
  connection: {
    host:     process.env.DB_HOST, 
    user:     process.env.DB_USER, 
    password: process.env.DB_PASS, 
    database: process.env.DB_BASE,
  }
});
var Database = require('bookshelf')(knex);

Database.plugin('registry');

module.exports = Database;

