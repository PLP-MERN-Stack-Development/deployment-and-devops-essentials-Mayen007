const path = require('path')
const dotenv = require('dotenv')

// Load .env from backend folder if present
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || ''
const MONGODB_DB = process.env.MONGODB_DB || undefined
const CUSTOM_DOMAIN = process.env.CUSTOM_DOMAIN || ''
const SSL_KEY_PATH = process.env.SSL_KEY_PATH || ''
const SSL_CERT_PATH = process.env.SSL_CERT_PATH || ''

module.exports = {
  NODE_ENV,
  PORT,
  MONGODB_URI,
  MONGODB_DB,
  CUSTOM_DOMAIN,
  SSL_KEY_PATH,
  SSL_CERT_PATH,
}
