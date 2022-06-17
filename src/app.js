const fastify = require('fastify');
const fastify_swagger = require('@fastify/swagger')
const fastifyPostgres = require('@fastify/postgres')

const {todosRoute} = require('./routes/route')
const {todoRoute_v2} = require('./routes/v2/todos')

const build = (opts = {}, optsSwagger={}, optsPostgres={}) => {
    const app = fastify(opts)
    app.register(fastifyPostgres, optsPostgres)
    app.register(fastify_swagger, optsSwagger)
    app.register(todosRoute, {prefix: '/v1'})
    app.register(todoRoute_v2, {prefix: '/v2'})
    return app
}

module.exports = {build}