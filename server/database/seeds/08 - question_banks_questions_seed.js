exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0')
        .then(knex.raw("TRUNCATE table question_banks_questions")
            .then(knex.raw("SET foreign_key_checks = 1")
                .then(function () {
                    // Inserts seed entries
                    return knex('question_banks_questions').insert([
                        {
                            "question_bank_id": 0,
                            "question_id": 1
                        },
                        {
                            "question_bank_id": 1,
                            "question_id": 2
                        },
                        {
                            "question_bank_id": 2,
                            "question_id": 0
                        },
                      
                    ])
                })))
}
          