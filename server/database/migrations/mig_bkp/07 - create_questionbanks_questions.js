exports.up = async function up(knex){
    return knex.schema.createTable('questionbanks_questions', table => {
        table.increments('id').primary()
        table.string('name')
        table.integer('questionbank_id').unsigned().notNullable().references('id').inTable('questionbanks').onDelete('CASCADE').index()
        table.integer('question_id').unsigned().notNullable().references('id').inTable('questions').onDelete('CASCADE').index()
    })

}


exports.down = async function down(knex) {
    return knex.schema.dropTable('questionbanks_questions')
}
