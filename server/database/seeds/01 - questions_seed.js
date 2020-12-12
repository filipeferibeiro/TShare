
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {
          "stem": "Quem roeu a roupa do rei de roma?",
          "author": 2,
          "description": "Blabla",
          
        },
        {
          "stem": "Cloroquina é eficaz contra COVID-19?",
          "author": 1,
          "description": "Fonte: Zapzap",
        },

      ]);
    });
};
