const https = require('https');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const { PORT, MONGODB_URI, MONGODB_DB, CUSTOM_DOMAIN, SSL_KEY_PATH, SSL_CERT_PATH } = require('./config');
const { connectDB } = require('./services/db');
const createApp = require('./app');

async function start() {
  try {
    if (MONGODB_URI) {
      await connectDB(MONGODB_URI, MONGODB_DB);
    }

    const app = createApp();

    const sslOptions = {
      key: fs.readFileSync(path.resolve(SSL_KEY_PATH)),
      cert: fs.readFileSync(path.resolve(SSL_CERT_PATH)),
    };

    https.createServer(sslOptions, app).listen(PORT, () => {
      const domain = CUSTOM_DOMAIN || `https://localhost:${PORT}`;
      logger.info(`Server listening on ${domain}`);
    });
  } catch (err) {
    logger.error('Failed to start server', { message: err.message });
    process.exit(1);
  }
}

start();
