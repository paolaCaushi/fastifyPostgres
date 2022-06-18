const {build} = require('../src/app')
const env = require('../src/config/env')


const createTableSQL = "CREATE TABLE IF NOT EXISTS products (id SERIAL, title varchar(250), completed boolean, gross_amount numeric, net_amount numeric, excluded_vat_amount numeric, PRIMARY KEY(id))";
const clearTableSQL = "DROP TABLE IF EXISTS products "
const insertFakeProductSQL = "INSERT INTO products (title, completed, gross_amount, net_amount, excluded_vat_amount ) VALUES ($1, $2, $3, $4, $5, $6, $7)";

module.exports = function setupTestEnv(){
    const app = build({logger: true}, {}, {connectionString: env.POSTGRES_TEST_DB_CONNECTION_STRING})

    beforeAll(async () =>{
        await app.ready()
        // await app.pg.query(createTableSQL)
        // await app.pg.query(clearTableSQL)
    })

    beforeEach(async () =>{
        await app.pg.query(createTableSQL)
        await app.pg.query(insertFakeProductSQL, ["Test Todo", true, 2, true, 20, 16.67, 3.33]);
    })

    afterEach(async () =>{
        await app.pg.query(clearTableSQL)
    })

    afterAll(async () =>{
        app.close()
    } )

    return app

}