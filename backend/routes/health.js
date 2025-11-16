const express = require('express')
const os = require('os')
const router = express.Router()

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    loadAverage: os.loadavg(),
    hostname: os.hostname(),
  })
})

router.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend' })
})

module.exports = router
