exports.up = async function up(knex) {

    return knex.schema.createTable('users', table => {
            table.increments('id').primary(),
            table.string('name').notNullable(),
            table.integer('reputation').notNullable().defaultTo(0),
            table.datetime('lastLogin').notNullable(),
            table.datetime('accountCreation').notNullable()
        }
    )
}

exports.down = async function down(knex) {
    return knex.schema.dropTable('users')
}
