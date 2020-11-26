// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    version: '5.7',
    connection: {
      host : 'localhost',
      port: 3306,
      user : 'root',
      password : 'm2r8m0c2',
      database : 'development',
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  }
};
