const todos = require('./todos')
const postTodo = {
    schema: {
        body: {
            type: "object",
            properties: {
                title: {type: 'string'},
                completed: {type: 'boolean'},
                status: {type: 'boolean'},
                gross_amount: {type: 'number'}
              },

        },
        response: {
            201: todos
        },
    }
  }

  module.exports = postTodo