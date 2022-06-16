const { build } = require("./../src/app");

const setup_tables = `CREATE TABLE IF NOT EXISTS "public"."todos" ( \
    "id" SERIAL PRIMARY KEY, \
    "title" VARCHAR(200), \
    "completed" BOOLEAN NOT NULL, \
    "gross_amount" DECIMAL NOT NULL, \
    "net_amount" DECIMAL NOT NULL, \
    "excluded_vat_amount" DECIMAL NOT NULL \
  )`;

const clear_tables = `DELETE FROM todos`;
const insertTodos =
  "INSERT INTO todos (title, completed, gross_amount, net_amount, excluded_vat_amount) VALUES ($1, $2, $3, $4, $5)";

module.exports = function setupTestEnv() {
  const app = build(
    { logger: true },
    {},
    {
      connectionString:
        "postgres://postgres:postgres@127.0.0.1:5432/postgres_test",
    }
  );

  beforeAll(async () => {
    await app.ready();
    await app.pg.query(setup_tables);
    await app.pg.query(clear_tables);
  });

  beforeEach(async () => {
    await app.pg.query(insertTodos, ["bsbwhd", "truw", 200, 100, 10]);
  });

  afterEach(async () => {
    await app.pg.query(clear_tables);
  });

  afterAll(async () => {
    app.close();
  });

  return app;
};