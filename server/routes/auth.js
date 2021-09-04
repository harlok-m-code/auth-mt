const { Router } = require('express')
const User = require('../controller/auth')
const { check } = require('express-validator')

const router = Router()

router.post('/registration',
[
    check('email','Некоректный email!').isEmail(),
    check('password','Некоректный пароль!').isLength({ min: 6 })
]
,User.insertUser)
router.post('/login',
[
    check('email','Некоректный email!').isEmail(),
    check('password','Некоректный пароль!').exists()
]
,User.loginUser)


module.exports = router