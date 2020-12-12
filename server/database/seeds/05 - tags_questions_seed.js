
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('tags_questions').del()
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
        } 
    )
}
          