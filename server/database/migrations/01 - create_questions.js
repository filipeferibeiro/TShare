exports.up = function(knex) {
    return knex.schema.createTable('questions', table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.integer('author').unsigned().notNullable().references('id').inTable('users').onDelete('NO ACTION').index();      
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  }