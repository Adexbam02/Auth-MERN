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