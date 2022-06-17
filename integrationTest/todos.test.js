const {setupTestEnv} = require('./setupTestEnv');

const app = setupTestEnv();

describe("Integretion tests for CRUD opertaions connected to test postgres Db", () => {
    test("should create an todo via POST route", async () => {
        const todo = {
            title: "test",
            completed: false,
            groos_amount: 20
          

        }
        const response = await app.inject({
            method: 'POST',
            url: '/v2/',
            payload: todo
        })

        expect(response.statusCode).toBe(201);
        expect(response.json()).toMatchObject(todo);

    })

})