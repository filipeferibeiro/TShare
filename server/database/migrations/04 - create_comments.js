exports.up = async function up(knex){
    
    knex.schema.hasTable('comments').then(function(exists) {
        if (!exists){
            return knex.schema.createTable('comments', table => {
                table.increments('id').primary(),
                table.text('text').notNullable(),
                table.integer('questionId').notNullable().references('id').inTable('questions').onDelete('CASCADE').index(),
                table.integer('authorId').notNullable().references('id').inTable('users').onDelete('CASCADE').index(),
                table.datetime('creationDate').notNullable(),
                table.integer('score').notNullable().defaultsTo(0)
            })
        }
    })
   
}

exports.down = async function down(knex) {
    return knex.schema.dropTable('comments')
}
