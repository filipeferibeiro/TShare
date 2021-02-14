
exports.seed = function(knex) {
  // Deletes ALL existing entries
  if (knex('questions').select('*').length == 0){
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
};
