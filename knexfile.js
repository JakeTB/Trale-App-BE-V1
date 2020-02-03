const { DB_URL } = process.env;
const pg = require("pg");
pg.defaults.ssl = true;
const ENV = process.env.NODE_ENV || "test";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  development: {
    connection: {
      database: "d4lqqe6ciphgmd",
      user: "nutputanuckahq",
      password:
        "c36bf15735ecb0e9aef50dea46cd4696593867b24705da5ddb9df96c137029f6",
      host: "ec2-35-175-170-131.compute-1.amazonaws.com",
      port: 5432,
      SSL: true
    }
  },
  test: {
    connection: {
      database: "trale_test",
      user: "postgres",
      password: "1234.psql"
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  }
};

console.log(customConfig[ENV]);

module.exports = { ...customConfig[ENV], ...baseConfig };
