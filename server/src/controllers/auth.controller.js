const { registerUser, loginUser } = require('../services/auth.service')

async function signup (req, res, next) {
  try {
    const { name, email, password } = req.body
    const result = await registerUser({ name, email, password })
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

async function login (req, res, next) {
  try {
    const { email, password } = req.body
    const result = await loginUser({ email, password })
    res.json(result)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  signup,
  login
}


