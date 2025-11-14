const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const ApiError = require('../utils/ApiError')
const config = require('../config')

function generateToken (userId) {
  return jwt.sign({ sub: userId }, config.jwtSecret, { expiresIn: '7d' })
}

async function registerUser ({ name, email, password }) {
  const existing = await User.findOne({ email: email.toLowerCase() })
  if (existing) {
    throw new ApiError(409, 'Email is already registered')
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email: email.toLowerCase(), passwordHash })
  const token = generateToken(user._id)

  return { user, token }
}

async function loginUser ({ email, password }) {
  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) {
    throw new ApiError(401, 'Invalid credentials')
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash)
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials')
  }

  const token = generateToken(user._id)
  return { user, token }
}

module.exports = {
  registerUser,
  loginUser
}


