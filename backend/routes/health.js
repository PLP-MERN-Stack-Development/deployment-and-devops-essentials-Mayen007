const express = require('express')
const router = express.Router()

router.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

router.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend' })
})

module.exports = router
