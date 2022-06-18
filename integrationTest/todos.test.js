const setupTestEnv = require('./setupTestEnv')

const app = setupTestEnv();

describe("Intgretation tests for CRUD operations connected to test postgres Db", () =>{
    test("Should create a todo via POST route", async () =>{
        const todo = {
            title: "Test Todo 4",
            completed: true,
            gross_amount : 20
        }
        
        const response = await app.inject({
            method: "POST",
            url: "/v2",
            payload: todo
        })

        expect(response.statusCode).toBe(201)
        expect(response.json()).toMatchObject({ "gross_amount": 20, "id": "2",  "title": "Test Todo 4", "status": true}) 
    })

    test("Should get all todos via GET route", async () =>{
        
        const response = await app.inject({
            method: "GET",
            url: "/v2",
        })

        expect(response.statusCode).toBe(200)
        expect(response.json()).toMatchObject([{title: "Test Title", excluded_vat_amount: "3.33", gross_amount: "20", id: 1, net_amount: "16.67", completed: true}]) 
    })

    test("Should get one todo via GET route", async () =>{
        
        const response = await app.inject({
            method: "GET",
            url: "/v2/1",

        })

        expect(response.statusCode).toBe(200)
        expect(response.json()).toMatchObject({ gross_amount: 20, id: 1, title: "Test Title", completed: true}) 
    })

    test("Should update a Todo via PUT route", async () =>{
        const todo = {
            title: "Test todo",
            completed: true
        }
        
        const response = await app.inject({
            method: "PUT",
            url: "/v2/1",
            payload: todo
        })

        expect(response.statusCode).toBe(200)
        expect(response.json()).toMatchObject(todo) 
    })

    test("Should delete a todo via DELETE", async () => {

        const response = await app.inject({
          method: "DELETE",
          url: "/v2/1",
        });
    
        expect(response.statusCode).toBe(200);
        expect(response).toMatchObject({
          body: "Todo with id = 1 was deleted",
        });
    
      });
    
    
})
