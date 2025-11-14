const ApiError = require('../utils/ApiError')
const config = require('../config')

function notFoundHandler (req, res, next) {
  next(new ApiError(404, 'Not found'))
}

// handling the errors for the api
function errorHandler (err, req, res, next) {
  let status = err.statusCode || err.status || 500
  let message = err.message || 'Internal server error'

  // some common database errors
  if (err.name === 'CastError') {
    status = 400
    message = 'Invalid ID format'
  }

  // logging the errors
  if (config.nodeEnv === 'production') {
    console.error(`[Error] ${status} - ${message}`)
  } else {
    console.error(err)
  }

  res.status(status).json({ message })
}

module.exports = { notFoundHandler, errorHandler }


