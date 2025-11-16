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

Render deployment (CI)

- This repository includes a GitHub Actions workflow `.github/workflows/backend-deploy.yml` which will:
  - install backend dependencies
  - trigger a deploy on Render via the Render API
  - poll until the deploy succeeds or fails
  - optionally ping the service `/health` endpoint if you add the `RENDER_SERVICE_URL` secret

Required repository secrets (set via GitHub repo Settings → Secrets):

- `RENDER_API_KEY` — API key from Render (create in Render dashboard)
- `RENDER_SERVICE_ID` — the Render service id for your backend (found in Render service settings)
- `RENDER_SERVICE_URL` (optional) — the public URL (e.g., `https://your-service.onrender.com`) to verify `/health`

How the workflow works:

1. On push to `main` the workflow runs and triggers a deploy using the Render API: `POST /v1/services/:serviceId/deploys`.
2. The workflow polls the deploy endpoint until it reports `success` or `failed` (timeout after 15 minutes).
3. If `RENDER_SERVICE_URL` is set, the workflow will attempt to verify the `/health` endpoint is reachable after a successful deploy.

Notes:

- You can also add a `render.yaml` manifest (sample included at project root) to configure services declaratively.
- Keep your `RENDER_API_KEY` secret. If you prefer, set up Render's native GitHub integration instead of the API-based deploy.
