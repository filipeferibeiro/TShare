exports.up = async function up(knex) {

    knex.schema.hasTable('questions').then(function(exists) {
      	if (!exists) {
        	return knex.schema.createTable('questions', table => {
          		table.increments('id').primary()
				table.string('title').notNullable()
				table.text('description').notNullable()
				table.integer('author').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
				table.text('long_answer')
				table.integer('question_type').unsigned().notNullable().defaultTo(0)
        	})
      	}
    })    
  }
  
exports.down = async function down(knex) {
	return knex.schema.dropTable('questions');
}