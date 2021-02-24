
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('tags').del()
      .then(function () {
        // Inserts seed entries
        return knex('tags').insert([
            {
              "name": "poesia",
            },
            {
              "name": "portugues"
            },
            {
              "name": "saúde"
            },
            {
              "name": "covid19"
            }
           
          ])
        } 
    )
}
          