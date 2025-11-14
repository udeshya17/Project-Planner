const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const authRoutes = require('./routes/auth.routes')
const projectRoutes = require('./routes/project.routes')
const taskRoutes = require('./routes/task.routes')
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app


