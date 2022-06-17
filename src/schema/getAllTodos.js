const todos = require('./todos')
const getAllTodos = {
    schema: {
        response: {
            200:{
                type: 'array',
                todos: todos
            },
        },
    }
  }

  module.exports = getAllTodos