const todos = require('./todos')
const getTodo = {
    schema: {
        response: {
            200: todos
        },
    }
  }

  module.exports = getTodo