exports.up = async function up(knex){

    knex.schema.hasTable('tags_questions').then(function(exists){
        if (!exists) {
            return knex.schema.createTable('tags_questions', table => {
                table.increments('id').primary()
                table.integer('tag_id').unsigned().notNullable().references('id').inTable('tags').onDelete('CASCADE').index();
                table.integer('question_id').unsigned().notNullable().references('id').inTable('questions').onDelete('CASCADE').index();
            })
        }
    })
}


exports.down = async function down(knex) {
    return knex.schema.dropTable('tags_questions')
}
