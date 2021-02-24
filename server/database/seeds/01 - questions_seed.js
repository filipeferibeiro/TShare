
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {
          "title": "Quem roeu a roupa do rei de roma?",
          "author": 2,
          "description": "Blabla",
          "question_type": 0,
          "long_answer": "Rattus norvegicus"
        },
        {
          "title": "Cloroquina é eficaz contra COVID-19?",
          "author": 1,
          "description": "Fonte: Zapzap",
          "question_type": 1,
        },

      ]);
    });
};
