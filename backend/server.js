const logger = require('./logger')
const { PORT, MONGODB_URI, MONGODB_DB } = require('./config')
const { connectDB } = require('./services/db')
const createApp = require('./app')

async function start() {
  try {
    if (MONGODB_URI) {
      await connectDB(MONGODB_URI, MONGODB_DB)
    }

    const app = createApp()
    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`)
    })
  } catch (err) {
    logger.error('Failed to start server', { message: err.message })
    process.exit(1)
  }
}

start()
