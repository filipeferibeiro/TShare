exports.up = async function up(knex) {
    knex.schema.hasTable('question_banks_questions').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('question_banks_questions', table => {
                table.increments('id').primary()
                table.integer('question_bank_id').unsigned().notNullable().references('id').inTable('question_banks').onDelete('CASCADE').index()
                table.integer('question_id').unsigned().notNullable().references('id').inTable('questions').onDelete('CASCADE').index()
            })
        }
    })
}


exports.down = async function down(knex) {
    return knex.schema.dropTable('question_banks_questions')
}
