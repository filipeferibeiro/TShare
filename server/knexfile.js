// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    version: '5.7',
    connection: {
      host : process.env.DB_HOST,
      port: process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DATABASE,
      charset: process.env.CHARSET
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  }
};
