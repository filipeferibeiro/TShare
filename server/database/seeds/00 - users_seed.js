
exports.seed = function(knex) {
  // Deletes ALL existing entries
      if (knex('users').select('*').length == 0)
  
      return knex('users').insert([
        { id: 0, name: 'Marlon', reputation: 12, lastLogin: "2020-02-28 00:01:02", accountCreation:  "1993-02-28 00:01:02", email: "marlinho@gmail.com", password: "abc"},
        { id: 1, name: 'Betão', reputation: -1, lastLogin:  "2020-02-28 00:01:02", accountCreation:  "1993-02-28 00:01:02", email: "betao@gmail.com", password: "123"},
        { id: 2, name: 'Lipe', reputation: 11, lastLogin:  "1993-02-28 00:01:02", accountCreation:  "1993-02-28 00:01:02", email: "lipinho@gmail.com", password: "xyz"},
      ]);
};
