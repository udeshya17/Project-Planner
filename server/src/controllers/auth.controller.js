const { registerUser, loginUser } = require('../services/auth.service')

// this api is used for signup and it will return the user data
async function signup (req, res, next) {
  try {
    const { name, email, password } = req.body
    const result = await registerUser({ name, email, password })
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}


// this api is used for login and it will return the jwt token
async function login (req, res, next) {
  try {
    const { email, password } = req.body
    const result = await loginUser({ email, password })
    res.json(result)
  } catch (err) {
    next(err)
  }
}

// just for getting the jwt token we have created this fucntion
async function generateToken (req, res, next) {
  try {
    const { email, password } = req.body
    const { token } = await loginUser({ email, password })
    res.json({ token })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  signup,
  login,
  generateToken
}


