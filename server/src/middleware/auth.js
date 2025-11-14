const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const config = require('../config')

async function authRequired (req, res, next) {
  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const payload = jwt.verify(token, config.jwtSecret)
    const user = await User.findById(payload.sub)
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = { authRequired }


