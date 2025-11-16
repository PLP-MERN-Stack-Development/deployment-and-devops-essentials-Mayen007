# Sentry Configuration - Active Setup

## ✅ Frontend Sentry Project

**Project**: `mern-frontend`  
**DSN**: `https://636985856c7a8a9aa8cffeb018ed07dc@o4510374841745408.ingest.de.sentry.io/4510375290732624`

**Status**: Ready to deploy

**Configuration**:

- Updated in: `frontend/.env.example`
- Environment variable name: `VITE_SENTRY_DSN`
- Next step: Add to Render frontend service environment

---

## ⏳ Backend Sentry Project

**Project**: `mern-backend`  
**Status**: Awaiting DSN

**Configuration**:

- Location: `backend/.env.example`
- Environment variable name: `SENTRY_DSN`
- Action needed: Get backend DSN from Sentry dashboard

---

## 🚀 Deployment Steps

### Step 1: Add Frontend DSN to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select **Frontend Service** (deployment-and-devops-essentials-mayen007-vu4l)
3. Settings → Environment
4. Add new variable:
   ```
   Key: VITE_SENTRY_DSN
   Value: https://636985856c7a8a9aa8cffeb018ed07dc@o4510374841745408.ingest.de.sentry.io/4510375290732624
   ```
5. Click **Save** and wait for auto-deploy

### Step 2: Get Backend DSN (When Ready)

1. Go to [Sentry Dashboard](https://sentry.io)
2. Navigate to **mern-backend** project
3. Go to **Settings** → **Client Keys (DSN)**
4. Copy the DSN
5. Add to Render backend service environment:
   ```
   Key: SENTRY_DSN
   Value: [Backend DSN]
   ```

### Step 3: Verify Integration

**Frontend**:

- Open https://deployment-and-devops-essentials-mayen007-vu4l.onrender.com/
- Open DevTools (F12) → Console
- Look for: `[Sentry] Initialized` message

**Backend**:

- Call health endpoint: `curl https://deployment-and-devops-essentials-mayen007.onrender.com/health`
- Check Sentry dashboard for events

---

## 📊 Sentry Dashboard Access

**Frontend Project**:

- Organization: [Your org]
- Project: mern-frontend
- URL: https://sentry.io/organizations/[org]/issues/?project=4510375290732624

**Backend Project**:

- Organization: [Your org]
- Project: mern-backend
- URL: https://sentry.io/organizations/[org]/projects/

---

## ✅ Environment Variables Reference

### Frontend (.env)

```dotenv
VITE_API_URL=https://deployment-and-devops-essentials-mayen007.onrender.com
VITE_SENTRY_DSN=https://636985856c7a8a9aa8cffeb018ed07dc@o4510374841745408.ingest.de.sentry.io/4510375290732624
```

### Backend (.env)

```dotenv
MONGODB_URI=mongodb+srv://week-7:week-7@cluster0.vt365wy.mongodb.net/week7?appName=Cluster0
CLIENT_URL=https://deployment-and-devops-essentials-mayen007-vu4l.onrender.com
PORT=5000
NODE_ENV=production
SENTRY_DSN=[To be added]
```

---

## 🔄 What's Already Integrated

✅ Frontend:

- Sentry React library installed
- Initialization in `src/main.jsx`
- Transaction tracing enabled
- DSN configured in `.env.example`

✅ Backend:

- Sentry Node library installed
- Initialization in `app.js`
- Request handler middleware
- Error handler middleware
- DSN export from `config/index.js`

---

## 📝 Next Actions

1. **Immediate** (2 min):

   - Add frontend DSN to Render
   - Wait for auto-deployment

2. **When Backend DSN Available** (2 min):

   - Add backend DSN to Render
   - Wait for auto-deployment

3. **Verify** (5 min):
   - Test frontend: Open app in browser, check console
   - Test backend: Call health endpoint
   - Check Sentry dashboards for events

---

## 📞 Support

For issues or questions:

- See `SENTRY_SETUP.md` for troubleshooting
- See `MONITORING.md` for integration details
- Sentry docs: https://docs.sentry.io/
