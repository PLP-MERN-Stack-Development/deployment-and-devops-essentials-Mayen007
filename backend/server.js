const https = require('https');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const { PORT, MONGODB_URI, MONGODB_DB, CUSTOM_DOMAIN, SSL_KEY_PATH, SSL_CERT_PATH } = require('./config');
const { connectDB } = require('./services/db');
const createApp = require('./app');
const http = require('http');

async function start() {
  try {
    if (MONGODB_URI) {
      await connectDB(MONGODB_URI, MONGODB_DB);
    }

    const app = createApp();

    // Removed HTTPS configuration for Render
    http.createServer(app).listen(PORT, () => {
      const domain = CUSTOM_DOMAIN || `http://localhost:${PORT}`;
      logger.info(`Server listening on ${domain}`);
    });
  } catch (err) {
    logger.error('Failed to start server', { message: err.message });
    process.exit(1);
  }
}

start();
