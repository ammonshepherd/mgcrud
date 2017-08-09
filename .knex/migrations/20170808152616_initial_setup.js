exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Categories', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamps();
    }),

    knex.schema.createTable('Locations', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.string('access');
      table.string('hours');
      table.string('address');
      table.string('website');
      table.string('email');
      table.string('phone');
      table.string('slug');
      table.string('latitude');
      table.string('longitude');
      table.string('picture');
      table.boolean('visible');
      table.timestamps();
    }),
    
    knex.schema.createTable('People', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('moniker');
      table.string('department');
      table.string('email');
      table.string('phone');
      table.string('website');
      table.string('picture');
      table.string('office_hours');
      table.string('office_address');
      table.text('bio');
      table.boolean('visible');
      table.integer('location_id').references('id').inTable('Locations');
      table.timestamps();
    }),

    knex.schema.createTable('Tools', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('make');
      table.string('model');
      table.string('picture');
      table.string('training');
      table.boolean('visible');
      table.integer('location_id').references('id').inTable('Locations');
      table.integer('category_id').references('id').inTable('Categories');
      table.timestamps();
    }),

    knex.schema.createTable('Users', function(table) {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('email');
      table.string('img');
      table.string('fullname').notNullable();
      table.timestamps();
    })


  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Categories'),
    knex.schema.dropTable('Locations'),
    knex.schema.dropTable('People'),
    knex.schema.dropTable('Tools'),
    knex.schema.dropTable('Users')
  ]);
};
