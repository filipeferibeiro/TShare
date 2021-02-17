exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0')
        .then(knex.raw("TRUNCATE table tags_questions")
            .then(knex.raw("SET foreign_key_checks = 1")
                .then(function () {
                    // Inserts seed entries
                    return knex('tags_questions').insert([
                        {
                            "tag_id": 1,
                            "question_id": 1,
                        },
                        {
                            "tag_id": 2,
                            "question_id": 1,
                        },
                        {
                            "tag_id": 3,
                            "question_id": 2,
                        },
                        {
                            "tag_id": 4,
                            "question_id": 2,
                        },
                    ])
                })))
}
          