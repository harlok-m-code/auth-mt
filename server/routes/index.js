const {Router} = require('express')
const user = require('./auth')
const todo = require('./todos')

const router = Router()


router.use('/', user)
router.use('/todos', todo)



module.exports = router