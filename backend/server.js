const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Simple health route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

// DB connect (optional)
const MONGODB_URI = process.env.MONGODB_URI || '';
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI, { dbName: process.env.MONGODB_DB || undefined })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Mongo connection error:', err));
}

// Error handler (simple)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
