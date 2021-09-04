require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`Mongodb connect success`)
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDB