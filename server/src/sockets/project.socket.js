const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User.model')

async function authenticateSocket (socket, next) {
  try {
    const token = socket.handshake.auth?.token
    if (!token) {
      return next(new Error('Authentication required'))
    }

    const payload = jwt.verify(token, config.jwtSecret)
    const user = await User.findById(payload.sub)
    if (!user) {
      return next(new Error('User not found'))
    }

    socket.user = user
    next()
  } catch (err) {
    next(new Error('Invalid or expired token'))
  }
}

function registerProjectSocket (io) {
  io.use(authenticateSocket)

  io.on('connection', (socket) => {
    const userId = socket.user._id.toString()

    socket.join(`user:${userId}`)

    socket.on('project:join', (projectId) => {
      if (projectId) {
        socket.join(`project:${projectId}`)
      }
    })

    socket.on('project:leave', (projectId) => {
      if (projectId) {
        socket.leave(`project:${projectId}`)
      }
    })
  })
}

module.exports = { registerProjectSocket }


