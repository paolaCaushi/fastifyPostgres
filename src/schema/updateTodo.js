const todos = require('./todos')
const updateTodo = {
    schema: {
        body: {
            type: "object",
            properties: {
                title: {type: 'string'},
                completed: {type: 'boolean'}
              },

        },
        response: {
            201: todos
        },
    }
  }

  module.exports = updateTodo