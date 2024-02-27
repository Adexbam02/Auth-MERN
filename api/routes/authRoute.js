const express = require('express')
const signup = require('../controllers/authController.js')
const signin = require('../controllers/authController.js')
const router = express.Router()


router.post('/signin', signin)
router.post('/signup', signup)

module.exports = router