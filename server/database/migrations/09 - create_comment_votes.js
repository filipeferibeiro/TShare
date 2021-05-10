exports.up = async function up(knex) {

    knex.schema.hasTable('comment_votes').then(function(exists) {
      	if (!exists) {
        	return knex.schema.createTable('comment_votes', table => {
          		table.increments('id').primary()
				table.integer('comment_id').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
				table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
				table.boolean('vote')
        	})
      	}
    })    
  }
  
exports.down = async function down(knex) {
	return knex.schema.dropTable('comment_votes');
}