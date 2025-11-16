const path = require('path')
const dotenv = require('dotenv')

// Load .env from backend folder if present
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || ''
const MONGODB_DB = process.env.MONGODB_DB || undefined

module.exports = {
  NODE_ENV,
  PORT,
  MONGODB_URI,
  MONGODB_DB,
}
