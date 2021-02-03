exports.up = async function up(knex) {

    return knex.schema.createTable('users', table => {
            table.increments('id').primary(),
            table.string('name').notNullable(),
            table.integer('reputation').notNullable().defaultTo(0),
            table.datetime('lastLogin').notNullable().defaultTo("1900-01-01 00:00:00")
            table.datetime('accountCreation').notNullable().defaultTo("1900-01-01 00:00:00")
            table.string('login').unique().notNullable(),
            table.string('password').notNullable()
        }
    )
}

exports.down = async function down(knex) {
    return knex.schema.dropTable('users')
}
