exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0')
        .then(knex.raw("TRUNCATE table tags")
            .then(knex.raw("SET foreign_key_checks = 1")
                .then(function () {
                        // Inserts seed entries
                        return knex('tags').insert([
                            {
                                "name": "poesia",
                            },
                            {
                                "name": "portugues"
                            },
                            {
                                "name": "saúde"
                            },
                            {
                                "name": "covid19"
                            }

                        ])
                    }
                )
            )
        )
}
          