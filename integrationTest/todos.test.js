const setupTestEnv = require('./setupTestEnv')

const app = setupTestEnv();

describe("Intgretation tests for CRUD operations connected to test postgres Db", () =>{
    test("Should create an product via POST route", async () =>{
        const todo = {
            title: "Test Todo 10",
            completed: true,
            gross_amount : 20,
            net_amount: 16.67,
            excluded_vat_amount: 3.33,
        }
        
        const response = await app.inject({
            method: "POST",
            url: "/v2",
            payload: todo
        })

        expect(response.statusCode).toBe(201)
        expect(response.json()).toMatchObject(todo) 
    })
})