exports.up = async function up(knex){

    knex.schema.hasTable('alternatives').then(function (exists) {
        if (!exists){
            return knex.schema.createTable('alternatives', table => {
                table.increments('id').primary(),
                table.string('text')
                table.boolean('correct')
                table.integer('question_id').unsigned().notNullable().references('id').inTable('questions').onDelete('CASCADE').index();
            })
        }
    })
    
}


exports.down = async function down(knex) {
    return knex.schema.dropTable('alternatives')
}
