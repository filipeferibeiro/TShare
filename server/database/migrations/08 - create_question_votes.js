exports.up = async function up(knex) {

    knex.schema.hasTable('question_votes').then(function(exists) {
      	if (!exists) {
        	return knex.schema.createTable('question_votes', table => {
          		table.increments('id').primary()
				table.integer('question_id').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
				table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
				table.boolean('vote')
        	})
      	}
    })    
  }
  
exports.down = async function down(knex) {
	return knex.schema.dropTable('question_votes');
}