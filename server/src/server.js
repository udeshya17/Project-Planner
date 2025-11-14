const http = require('http')
const app = require('./app')
const { connectDB } = require('./config/db')
const config = require('./config')

const server = http.createServer(app)

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


