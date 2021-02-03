exports.up = function(knex) {
    return knex.schema.createTable('questions', table => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.integer('author').unsigned().notNullable().references('id').inTable('users').onDelete('NO ACTION').index()
      table.string('long_answer')
      table.integer('question_type').unsigned().notNullable().defaultsTo(0)
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  }