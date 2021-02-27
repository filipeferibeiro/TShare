exports.up = async function up(knex){
    
    knex.schema.hasTable('comments').then(function(exists) {
        if (!exists){
            return knex.schema.createTable('comments', table => {
                table.increments('id').primary()
                table.text('text').notNullable()
                table.integer('question_id').unsigned().notNullable().references('id').inTable('questions').onDelete('CASCADE').index()
                table.integer('author_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').index()
                table.dateTime('creation_date').notNullable()
                table.integer('score').notNullable().defaultTo(0)
            })
        }
    })
   
}

exports.down = async function down(knex) {
    return knex.schema.dropTable('comments')
}
