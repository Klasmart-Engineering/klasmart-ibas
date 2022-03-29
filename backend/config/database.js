function getDevConnections(env) {
  return {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: env("DATABASE_URL"),
        database: env("DATABASE_NAME"),
        username: env("DATABASE_USERNAME"),
        password: env("DATABASE_PASSWORD"),
      },
      options: {},
    },
  };
}

function getProductionConnections(env) {
  return {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: `/cloudsql/${env("INSTANCE_CONNECTION_NAME")}`,
        database: env("DATABASE_NAME"),
        username: env("DATABASE_USERNAME"),
        password: env("DATABASE_PASSWORD"),
      },
      options: {
        pool: {
          min: 0,
          max: 5,
          idleTimeoutMillis: 30000,
          createTimeoutMillis: 30000,
          acquireTimeoutMillis: 30000,
        },
      },
    },
  };
}

module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections:
    env("NODE_ENV") === "development"
      ? getDevConnections(env)
      : getProductionConnections(env),
});
