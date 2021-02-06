exports.up = async function up(knex){

    knex.schema.hasTable('tags').then(function(exists){
        if (!exists) {
            return knex.schema.createTable('tags', table => {
                table.increments('id').primary(),
                table.string('name')
            })
        }
    })
}

exports.down = async function down(knex) {
    return knex.schema.dropTable('tags')
}
