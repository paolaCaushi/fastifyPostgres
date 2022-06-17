
const vatCalculator = require('../../utils/vatCalulator')
const todos = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        completed: { type: 'boolean' },
        gross_amount: { type: 'number' }
    },
}

const postTodo = {
    schema: {
        body: {
            type: "object",
            properties: {
                title: { type: 'string' },
                completed: { type: 'boolean' },
                gross_amount: { type: 'number' }
            },

        },
        response: {
            201: todos
        },
    },
};

const todoRoute_v2 = async (fastify, options, done) => {

    fastify.get('/', async (request, reply) => {
        try {
            const { rows } = await fastify.pg.query("SELECT * FROM todos")
            reply.send(rows)
        } catch (err) {
            reply.send(error)
        }
    })

    fastify.get('/:id', async (request, reply) => {
        try {
            const { id } = request.params
            const { rows } = await fastify.pg.query("SELECT * FROM todos WHERE id=$1", [id])
            reply.send(rows[0])
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.post('/', postTodo, async (request, reply) => {


        const { title, completed, groos_amount } = request.body

        const netAmount = vatCalculator.calculateNetAmount(groos_amount)

        const vatAmount = vatCalculator.calculateVat(netAmount)
        try {
            const { rows } = await fastify.pg.query("INSERT INTO todos (title,completed,groos_amount,net_amount,excluded_vat_amount) VALUES ($1, $2,$3,$4,$5) RETURNING *",
                [title, completed, groos_amount, netAmount, vatAmount]);
            reply.code(201).send(rows[0]);
        } catch (error) {
            reply.send(error)
        }

    })

    fastify.put('/:id', async (request, reply) => {
        try {
            const { id } = request.params
            const { title, completed } = request.body
            const { rows } = await fastify.pg.query("UPDATE todos SET title = $1, completed = $2 WHERE id=$3 RETURNING *",
                [title, completed, id])

            reply.send(rows[0])
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.delete("/:id", async (request, reply) => {
        try {
            const { id } = request.params;
            await fastify.pg.query("DELETE FROM todos WHERE id=$1", [id]);
            reply.send(`Todo with id: ${id} has been deleted`);
        } catch (error) {
            reply.send(error);
        }
    });

    done();
}

module.exports = { todoRoute_v2 }
