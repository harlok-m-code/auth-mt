const Todos = require('../models/Todo')

class Todo {

    async insertTodo (req, res) {
        try {
            const {text, userId} = req.body

            const todo = await new Todos({
                text,
                owner: userId,
                completed: false,
                important: false,
            })
            
            await todo.save()

            res.json(todo)
        } catch (error) {
            console.log(error)
        }
    }

    async getTodos (req, res) {
        try {
            const { userId } = req.query

            const todo = await Todos.find({ owner: userId})

            res.json(todo)
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new Todo()