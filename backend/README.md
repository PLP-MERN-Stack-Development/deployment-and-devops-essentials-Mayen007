# Backend: Production Notes

This file documents recommended steps to prepare the backend for production.

Logging

- We use `winston` for structured logs in production. `LOG_LEVEL` controls verbosity (e.g., `info`, `warn`, `error`).
- The current `logger.js` uses `winston` if installed; it falls back to console methods when not available.
- To enable file-based logging or remote transports (CloudWatch, Loggly, etc.), update `backend/logger.js` and add the appropriate `winston` transport.

MongoDB (Atlas)

- Create an Atlas cluster, then create a database user with a strong password. Grant readWrite on the application's database only.
- Store the connection string in `MONGODB_URI` (do not commit secrets).
- Recommended Mongoose options for production (already used in `services/db.js`):
  - `maxPoolSize` (e.g., 10)
  - `serverSelectionTimeoutMS` (e.g., 5000)
  - `connectTimeoutMS` (e.g., 10000)
- Configure backups and monitoring in Atlas (enable continuous backups or scheduled snapshots depending on your needs).

Error Tracking

- Add a `SENTRY_DSN` to `.env` and wire Sentry SDK if you want automatic error reporting. Keep DSN secret.

Environment

- Keep production env vars configured in your host (Render/Vercel/Heroku) and never commit `.env`.
