const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const Sentry = require('@sentry/node')
const { NODE_ENV, SENTRY_DSN } = require('./config')
const healthRoutes = require('./routes/health')
const notFoundHandler = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

function createApp() {
  const app = express()

  // Initialize Sentry for error tracking
  if (SENTRY_DSN) {
    Sentry.init({ dsn: SENTRY_DSN })
    app.use(Sentry.Handlers.requestHandler())
  }

  // Basic security
  app.use(helmet())

  // Body parsing
  app.use(express.json())

  // Request logging: dev vs production formats
  const morganFormat = NODE_ENV === 'production' ? 'combined' : 'dev'
  app.use(morgan(morganFormat))

  // Routes
  app.use('/', healthRoutes)

  // 404 + error handlers
  app.use(notFoundHandler)
  if (SENTRY_DSN) {
    app.use(Sentry.Handlers.errorHandler())
  }
  app.use(errorHandler)

  return app
}

module.exports = createApp
