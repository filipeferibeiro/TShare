exports.up = async function up(knex) {

    knex.schema.hasTable('question_banks').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('question_banks', table => {
                table.increments('id').primary()
                table.string('title'),
                table.integer('author').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').index(); //Depois mudar pra Teachers
            })
        }
    })
}


exports.down = async function down(knex) {
    return knex.schema.dropTable('question_banks')
}
