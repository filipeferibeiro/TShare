const knex = require('knex')


exports.up = async function up(knex){
    return knex.schema.createTable('exams_questions', table => {
        table.increments('id').primary(),
        table.integer('exam_id').notNullable().references('id').inTable('exams')
        table.integer('question_id').notNullable().references('id').inTable('questions')
    })

}


exports.down = async function down(knex) {
    return knex.schema.dropTable('exams_questions')
}
