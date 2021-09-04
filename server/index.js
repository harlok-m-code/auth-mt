require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config')
const router = require('./routes/index')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use('/',router)

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`)
        })
        connectDB()
    } catch (error) {
        console.log(error)        
    }
}

start()