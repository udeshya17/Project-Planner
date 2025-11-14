const mongoose = require('mongoose')
const config = require('./index')

async function connectDB () {
  if (!config.mongoUri) {
    throw new Error('MONGODB_URI is not set')
  }

  await mongoose.connect(config.mongoUri)
  console.log('Connected to MongoDB')
}

module.exports = { connectDB }


