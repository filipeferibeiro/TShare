
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        { stem: 'Questao1', author: 1},
        { stem: 'Questao2', author: 1},
        { stem: 'Questao3', author: 1}
      ]);
    });
};
