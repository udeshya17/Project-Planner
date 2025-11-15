const http = require('http')
const { Server } = require('socket.io')
const app = require('./app')
const { connectDB } = require('./config/db')
const config = require('./config')
const { registerProjectSocket } = require('./sockets/project.socket')

const server = http.createServer(app)

// connect with socket
const io = new Server(server, {
  cors: {
    origin: config.clientOrigin || 'http://localhost:5173',
    credentials: true
  }
})

// here socket availaible for request handlers
app.set('io', io)
registerProjectSocket(io)

connectDB()
  .then(() => {
    server.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`)
    })
  })
  .catch((err) => {
    console.error('Failed to start server', err)
    process.exit(1)
  })

module.exports = server


