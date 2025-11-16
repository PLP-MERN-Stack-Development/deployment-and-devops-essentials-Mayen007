// Logger: use winston when available to support production transports;
// fallback to console methods if winston is not present.
const { NODE_ENV } = require('./config')
const LOG_LEVEL = process.env.LOG_LEVEL || (NODE_ENV === 'production' ? 'info' : 'debug')

let logger
try {
  const { createLogger, format, transports } = require('winston')
  const { combine, timestamp, printf, colorize } = format

  const logFormat = printf(({ level, message, timestamp: ts, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ''
    return `[${ts}] [${level.toUpperCase()}] ${message}${metaStr}`
  })

  logger = createLogger({
    level: LOG_LEVEL,
    format: combine(timestamp(), logFormat),
    transports: [new transports.Console({ format: combine(colorize(), timestamp(), logFormat) })],
  })
} catch (e) {
  // winston not installed or failed to load — fallback to console
  logger = {
    info: (msg, meta) => console.log(`[INFO] ${msg}`, meta || ''),
    warn: (msg, meta) => console.warn(`[WARN] ${msg}`, meta || ''),
    error: (msg, meta) => console.error(`[ERROR] ${msg}`, meta || ''),
    debug: (msg, meta) => {
      if (NODE_ENV !== 'production') console.debug(`[DEBUG] ${msg}`, meta || '')
    },
  }
}

module.exports = {
  info: (msg, meta) => logger.info(msg, meta),
  warn: (msg, meta) => logger.warn(msg, meta),
  error: (msg, meta) => logger.error(msg, meta),
  debug: (msg, meta) => logger.debug(msg, meta),
}
