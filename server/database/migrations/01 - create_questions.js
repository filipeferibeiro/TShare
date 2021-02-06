exports.up = function(knex) {

    knex.schema.hasTable('questions').then(function(exists) {
      	if (!exists) {
        	return knex.schema.createTable('questions', table => {
          		table.increments('id').primary(),
				table.string('title').notNullable(),
				table.text('description').notNullable(),
				table.integer('author').unsigned().references('id').inTable('users').onDelete('CASCADE').index(),
				table.text('long_answer'),
				table.integer('question_type').unsigned().notNullable().defaultsTo(0)
        	})
      	}
    })    
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTable('questions');
  }