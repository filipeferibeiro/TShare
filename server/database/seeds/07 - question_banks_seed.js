exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0')
        .then(knex.raw("TRUNCATE table question_banks")
            .then(knex.raw("SET foreign_key_checks = 1")
                .then(function () {
                    // Inserts seed entries
                    return knex('question_banks').insert([
                        {
                            "title": "Banco do Brasil",
                            "author": 0
                        },
                        {
                            "title": "Banco do Panamericano",
                            "author": 1
                        },
                        {
                            "title": "Banco Santander",
                            "author": 2
                        },
                      
                    ])
                })))
}
          