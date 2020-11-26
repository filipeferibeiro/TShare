exports.up = async function up(knex){
    return knex.raw("create table teachers (id int references users, PRIMARY KEY(id));")
}

exports.down = async function down(knex) {
    return knex.schema.dropTable('teachers')
}
