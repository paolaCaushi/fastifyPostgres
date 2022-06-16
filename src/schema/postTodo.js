const todos = require('./todos')
const postTodo = {
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

  module.exports = postTodo