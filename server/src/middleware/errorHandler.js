const ApiError = require('../utils/ApiError')

function notFoundHandler (req, res, next) {
  next(new ApiError(404, 'Not found'))
}

// eslint-disable-next-line no-unused-vars
function errorHandler (err, req, res, next) {
  const status = err.statusCode || err.status || 500
  const message = err.message || 'Internal server error'

  // Simple logging for now
  // In a real app, connect this to a logger service
  console.error(err)

  res.status(status).json({ message })
}

module.exports = { notFoundHandler, errorHandler }


