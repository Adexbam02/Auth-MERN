const bcryptjs = require("bcryptjs")
const User = require("../models/userModel");
const errorHandler  = require("../utils/error");

const signup = async (req, res, next) => {
    const { username, email, password } = req.body

    // Check if password meets minimum length requirement
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })

    try {
        await newUser.save()
        res.status(201).json({ message: "User created succesfully" })
    } catch (error) {
        next(error)
    }
}

module.exports = signup