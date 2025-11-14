const express = require('express')
const authController = require('../controllers/auth.controller')
const { validate } = require('../middleware/validate')
const { signupSchema, loginSchema } = require('../validation/auth.validation')

const router = express.Router()

//this api is ised for signup
router.post('/signup', validate(signupSchema), authController.signup)

// this api is used for login and it will return the jwt token
router.post('/login', validate(loginSchema), authController.login)

// This api is only for generating the jwt token
router.post('/token', validate(loginSchema), authController.generateToken)

module.exports = router


