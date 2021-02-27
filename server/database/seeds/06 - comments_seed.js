exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0')
        .then(knex.raw("TRUNCATE table tags")
            .then(knex.raw("SET foreign_key_checks = 1")
                .then(function () {
                    return knex('comments').insert([
                        {
                            "id": 0,
                            "text": "Essa questão tá uma desgraça",
                            "question_id": 2,
                            "author_id": 1,
                            "creation_date": "1996-08-03 00:00:00",
                        },
                        {
                            "id": 1,
                            "text": "Essa questão tá uma desgraça",
                            "question_id": 1,
                            "author_id": 2,
                            "creation_date": "1996-08-03 00:00:00",
                        },
                        {
                            "id": 2,
                            "text": "Essa questão tá uma desgraça",
                            "question_id": 0,
                            "author_id": 1,
                            "creation_date": "1996-08-03 00:00:00",
                        },
                    ])
                })))
}
