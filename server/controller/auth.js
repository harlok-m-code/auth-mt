const userSchema = require('../models/User') 
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class User {
    
    async insertUser (req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors:errors.array(),
                    message:"Некорректные данные при регистрации!"
                })
            }

            const { email, password } = req.body;
            
            const isUsed = await userSchema.findOne({ email })

            if(isUsed){
               return res.status(300).json({message:"Данный Email занят!"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)


            const user = new userSchema({
                email,
                password:hashedPassword
            })

            await user.save()
            
            res.status(201).json({message:"Пользователь создан!"})
        } catch (error) {
            res.status(200).json({message:`Ошибка: ${error}`})
        }
    }

    async loginUser (req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors:errors.array(),
                    message:"Некорректные данные при регистрации!"
                })
            }

            const { email, password } = req.body;
            
            const user = await userSchema.findOne({ email })

            if(!user) {
                return res.status(400).json({message:"Данный пользователь не заригестрирован!"})
            }
            const isMatch = bcrypt.compare(password, user.password)
            if(!isMatch) {
                return res.status(400).json({message:"Не верный Пароль!"})
            }

            const jwtsecret = 'asfajgf2124jhhgkagsas123asfaf'

            const token = jwt.sign(
                {userId:user._id},
                jwtsecret,
                {expiresIn: '3h'})

                res.json({token,userId: user._id})
        } catch (error) {
            res.status(200).json({message:`Ошибка: ${error}`})
        }
    }

}

module.exports = new User()