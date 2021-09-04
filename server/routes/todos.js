const {Router} = require('express')
const router = Router()
const Todo = require('../controller/todos')


router.post('/', Todo.insertTodo)
router.get('/', Todo.getTodos)

module.exports = router