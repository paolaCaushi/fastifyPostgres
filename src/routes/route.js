const getAllTodos = require('../schema/getAllTodos')
const getTodo = require('../schema/getTodo')
const postTodo = require('../schema/postTodo')
const deleteTodo = require('../schema/deleteTodo')
const updateTodo = require('../schema/updateTodo')
let Todos = require('../Todos')

const todosRoute=(fastify, options, done) => {


    fastify.get('/',getAllTodos, function(request, reply){
        const todos = Todos
        reply.send(todos)
    })

    fastify.get('/:id',getTodo, function(request, reply){
        const {id} = request.params
        const todos = Todos.find((item)=> item.id === id )        
        reply.send(todos)
    })

    fastify.post('/',postTodo, function(request, reply){
        const {title, completed} = request.body
        const todos = {id: String(Todos.length +1), title, completed}  
        Todos.push(todos)
        reply.code(201).send(todos)
    })

    fastify.delete('/:id',deleteTodo,function(request, reply){
        const {id} = request.params
        Todos = Todos.filter((item)=> item.id !== id)
        reply.send(`Todo with ${id} got deleted`)

    })

    fastify.put('/:id',updateTodo, function(request, reply){
        const {id} = request.params
        const {title, completed}= request.body
        const todos = Todos.find((todos)=> todos.id === id )
        todos.title= title
        todos.completed = completed
    
        reply.send(todos)
    })
    

    done()
}

module.exports = {todosRoute}