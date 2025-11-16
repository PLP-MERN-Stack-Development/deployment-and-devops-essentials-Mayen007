const mongoose = require('mongoose')
const logger = require('../logger')

async function connectDB(uri, dbName) {
  if (!uri) {
    logger.warn('No MongoDB URI provided; skipping DB connection')
    return
  }

  const opts = {
    dbName: dbName || undefined,
    // Pooling and retry options recommended for production
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    // useUnifiedTopology is default in modern mongoose versions
  }

  try {
    await mongoose.connect(uri, opts)
    logger.info('Connected to MongoDB')
  } catch (err) {
    logger.error('MongoDB connection error', { message: err.message })
    throw err
  }
}

module.exports = { connectDB }
