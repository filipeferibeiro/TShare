exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0')
        .then(knex.raw("TRUNCATE table alternatives")
            .then(knex.raw("SET foreign_key_checks = 1")
                .then(function () {
                        return knex('alternatives').insert([
                            {
                                "text": "O rato",
                                "correct": true,
                                "question_id": 1
                            },
                            {
                                "text": "O gato",
                                "correct": false,
                                "question_id": 1
                            },
                            {
                                "text": "O pato",
                                "correct": false,
                                "question_id": 1
                            },
                            {
                                "text": "O mato",
                                "correct": false,
                                "question_id": 1
                            },
                            {
                                "text": "Não",
                                "correct": true,
                                "question_id": 2
                            },
                            {
                                "text": "Nunca",
                                "correct": true,
                                "question_id": 2
                            },
                            {
                                "text": "Nem a pau",
                                "correct": true,
                                "question_id": 2
                            },
                            {
                                "text": "O mito disse que sim",
                                "correct": false,
                                "question_id": 2
                            }
                        ])
                    }
                )
            )
        )
}
          