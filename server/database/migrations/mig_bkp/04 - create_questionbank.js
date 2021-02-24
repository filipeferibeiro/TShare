exports.up = async function up(knex){
    return knex.schema.createTable('questionbanks', table => {
        table.increments('id').primary()
        table.string('name')
        table.integer('author').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').index(); //Depois mudar pra Teachers
    })

}


exports.down =  async function down(knex) {
    return knex.schema.dropTable('questionbanks')
}
