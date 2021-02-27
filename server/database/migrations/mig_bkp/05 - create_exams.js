const knex = require('knex')


exports.up = async function up(knex){
    return knex.schema.createTable('exams', table => {
        table.increments('id').primary()
        table.integer('author').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').index(); //Depois mudar pra Teachers
    })

}


exports.down = async function down(knex) {
    return knex.schema.dropTable('exams')
}
