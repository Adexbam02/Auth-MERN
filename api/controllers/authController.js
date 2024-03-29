const bcryptjs = require("bcryptjs")
const User = require("../models/userModel");
const errorHandler = require("../utils/error");
const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {
    const { username, email, password } = req.body

    // Check if password meets minimum length requirement
    // if (password.length < 6) {
    //     return res.status(400).json({ message: "Password must be at least 6 characters long" });
    // }

    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })

    try {
        await newUser.save()
        res.status(201).json({ message: "User created succesfully" })
    } catch (error) {
        next(error)
        // console.log(error)
    }
}




const signin = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User not found'))

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'))

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: hashedPassword, ...rest } = validUser._doc
        const expiryDate = new Date(Date.now() + 3600000) // 1hr 
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

module.exports = signup
module.exports = signin