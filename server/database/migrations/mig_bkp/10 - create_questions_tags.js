const knex = require('knex')


exports.up = async function up(knex){
    return knex.schema.createTable('questions_tags', table => {
        table.increments('id').primary(),
        table.foreign('question_id').references('id').inTable('questions'),
        table.foreign('tag_id').references('id').inTable('tags')
    })
}


exports.down =  async function down(knex) {
    return knex.schema.dropTable('questions_tags')
}
