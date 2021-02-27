// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    version: '5.7',
    connection: {
      host : process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || "3306",
      user : process.env.DB_USER || "root",
      password : process.env.DB_PASSWORD || "pizza123",
      database : process.env.DATABASE || "development",
      charset: process.env.CHARSET || "utf8"
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    }
  }
};
