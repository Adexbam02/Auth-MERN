const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const userRoute = require('./routes/userRoute.js')
const authRoute = require('./routes/authRoute.js')
app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})
















mongoose.connect(process.env.MONGO_DB1)
    .then(() => {
        console.log(`Connected to database`)
    })
    .catch((err) => {
        console.log(err)
    })


app.listen(3000, () => {
    console.log('Server running already')
})