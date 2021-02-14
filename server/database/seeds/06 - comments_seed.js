
exports.seed = function(knex) {
  // Deletes ALL existing entries
  if (knex('comments').select('*').length == 0){
      // Inserts seed entries
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
      ]);
  }
};
