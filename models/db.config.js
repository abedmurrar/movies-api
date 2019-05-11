var knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  // pool: {
  //   afterCreate: function(conn, done) {
  //     // in this example we use pg driver's connection API
  //     conn.query('SET timezone="UTC";', function(err) {
  //       if (err) {
  //         // first query failed, return error and don't try to make next query
  //         done(err, conn);
  //       } else {
  //         // do the second query...
  //         conn.query("SELECT set_limit(0.01);", function(err) {
  //           // if err is not falsy, connection is discarded from pool
  //           // if connection aquire was triggered by a query the error is passed to query promise
  //           done(err, conn);
  //         });
  //       }
  //     });
  //   }
  // },
  acquireConnectionTimeout: 10000
  // overly simplified snake_case -> camelCase converter
  // postProcessResponse: (result, queryContext) => {
  //   // TODO: add special case for raw results (depends on dialect)
  //   if (Array.isArray(result)) {
  //     return result.map(row => convertToCamel(row));
  //   } else {
  //     return convertToCamel(result);
  //   }
  // }
});

module.exports = knex;
