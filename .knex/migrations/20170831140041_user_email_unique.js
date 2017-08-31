
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('Users', function(table) {
      table.string('email').unique().notNullable().defaultTo(1).alter();
    })
  ]); 
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('Users', function(table) {
      table.dropUnique('email').nullable().alter();
    })
  ]); 
  
};
