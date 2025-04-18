import type { Knex } from "knex";

const { attachPaginate } = require('knex-paginate');

attachPaginate();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
