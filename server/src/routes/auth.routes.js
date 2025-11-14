const express = require('express')
const authController = require('../controllers/auth.controller')
const { validate } = require('../middleware/validate')
const { signupSchema, loginSchema } = require('../validation/auth.validation')

const router = express.Router()

router.post('/signup', validate(signupSchema), authController.signup)

router.post('/login', validate(loginSchema), authController.login)

module.exports = router


