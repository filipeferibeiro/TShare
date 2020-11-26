exports.up = function(knex) {
    return knex.schema.createTable('questions', table => {
      table.increments('id').primary();
      table.string('stem').notNullable();
      table.integer('author').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').index();      
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  }