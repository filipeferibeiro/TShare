exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex.raw('SET foreign_key_checks = 0')
        .then(knex.raw("TRUNCATE table questions")
            .then(knex.raw("SET foreign_key_checks = 1")
                .then(function () {
                        // Inserts seed entries
                        return knex('questions').insert([
                            {
                                "id": 0,
                                "title": "Quem roeu a roupa do rei de roma?",
                                "author": 2,
                                "description": "Blabla",
                                "question_type": 0,
                                "long_answer": "Rattus norvegicus"
                            },
                            {
                                "id": 1,
                                "title": "Cloroquina é eficaz contra COVID-19?",
                                "author": 1,
                                "description": "Fonte: Zapzap",
                                "question_type": 1,
                            },

                        ]);
                    }
                )
            )
        )
};
