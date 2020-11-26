
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'Marlon', reputation: 12, lastLogin: "2020-02-28 00:01:02", accountCreation:  "1993-02-28 00:01:02"},
        { name: 'Betão', reputation: -1, lastLogin:  "2020-02-28 00:01:02", accountCreation:  "1993-02-28 00:01:02"},
        { name: 'Lipe', reputation: 11, lastLogin:  "2020-02-28 00:01:02", accountCreation:  "1993-02-28 00:01:02"},
      ]);
    });
};
