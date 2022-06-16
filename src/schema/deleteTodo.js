const todos = require('./todos')
const deleteTodo = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {type: 'string'}
                }
            }
        },
    }
  }


  module.exports = deleteTodo