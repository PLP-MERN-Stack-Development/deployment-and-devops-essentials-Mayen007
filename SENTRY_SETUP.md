# Sentry Setup Guide

Complete guide to set up error tracking with Sentry for your MERN application.

## Step 1: Create Sentry Account

1. Go to [sentry.io](https://sentry.io)
2. Click **Sign Up**
3. Choose your preferred signup method (GitHub, Google, or email)
4. Verify your email

## Step 2: Create Organization

After signing up, you'll be prompted to create an organization:

- **Organization Name**: Enter your organization name (e.g., "PLP MERN Stack")
- Click **Create Organization**

## Step 3: Create Projects

Create two separate projects for backend and frontend monitoring:

### 3A. Backend Project

1. Click **Create Project** on the dashboard
2. Select platform: **Node.js**
3. Project name: `mern-backend`
4. Team: Select your team
5. Click **Create Project**
6. You'll receive a **Backend DSN** that looks like:
   ```
   https://exampleKey@exampleOrg.ingest.sentry.io/exampleProjectId
   ```
7. **Copy and save this DSN**

### 3B. Frontend Project

1. Click **Create Project** again
2. Select platform: **React**
3. Project name: `mern-frontend`
4. Team: Select your team
5. Click **Create Project**
6. You'll receive a **Frontend DSN** that looks like:
   ```
   https://exampleKey@exampleOrg.ingest.sentry.io/exampleProjectId
   ```
7. **Copy and save this DSN**

## Step 4: Configure Render Environment Variables

### 4A. Backend Service Configuration

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your **Backend Service** (deployment-and-devops-essentials-mayen007)
3. Go to **Settings** → **Environment**
4. Click **Add Environment Variable**
5. Add the following:
   ```
   Key: SENTRY_DSN
   Value: [Paste your Backend DSN from Step 3A]
   ```
6. Click **Add**
7. Click **Deploy** to apply changes

### 4B. Frontend Service Configuration

1. In Render Dashboard, select your **Frontend Service** (deployment-and-devops-essentials-mayen007-vu4l)
2. Go to **Settings** → **Environment**
3. Click **Add Environment Variable**
4. Add the following:
   ```
   Key: VITE_SENTRY_DSN
   Value: [Paste your Frontend DSN from Step 3B]
   ```
5. Click **Add**
6. Click **Deploy** to apply changes

## Step 5: Verify Integration

### 5A. Backend Verification

Wait 5 minutes after deployment, then:

```bash
# Check if health endpoint is working
curl https://deployment-and-devops-essentials-mayen007.onrender.com/health

# The response should include system metrics
```

In your Sentry dashboard:

1. Go to **Projects** → **mern-backend**
2. Look for incoming events
3. You may see connection events or errors depending on traffic

### 5B. Frontend Verification

1. Open https://deployment-and-devops-essentials-mayen007-vu4l.onrender.com/
2. Open Developer Tools (F12)
3. Go to **Console** tab
4. Look for Sentry initialization message:
   ```
   [Sentry] Initialized: https://exampleKey@exampleOrg.ingest.sentry.io/exampleProjectId
   ```
5. Test an interaction (click "Load extra UI" button)

In your Sentry dashboard:

1. Go to **Projects** → **mern-frontend**
2. You should see incoming events/transactions

## Step 6: Configure Sentry Features

### Enable Performance Monitoring

**For Backend**:

1. In Sentry, go to **Settings** → **Performance**
2. Enable **Performance Monitoring**
3. Set sample rate: **100%** (for development/testing)
4. For production, reduce to **10-20%**

**For Frontend**:

1. Same steps as backend
2. Configure React-specific settings:
   - Enable component profiling
   - Set transaction sample rate

### Configure Alerts

1. Go to **Alerts** tab
2. Click **Create Alert Rule**

**Alert Rule Example**:

```
IF: Issue occurrence rate
    increases by: 100%
    during: 5 minutes

THEN: Send notification to: [Your Email]
```

3. Repeat for frontend project

### Set Up Release Tracking

1. Go to **Releases** in Sentry dashboard
2. Find your current version
3. View associated errors and performance data

## Step 7: Monitor Your Application

### Viewing Errors

1. Go to **Issues** tab in your project
2. Click on any issue to see:
   - Stack trace
   - Breadcrumbs (user actions before error)
   - Context (browser, OS, device)
   - Affected users
   - Release information

### Performance Monitoring

1. Go to **Performance** tab
2. View transaction traces:
   - Page load transactions
   - API request durations
   - Database query times

### Release Health

1. Go to **Releases** tab
2. View:
   - Crash rate
   - Adoption rate
   - Session data

## Step 8: Integrate with GitHub (Optional)

1. In Sentry, go to **Integrations**
2. Click **GitHub**
3. Click **Install**
4. Authorize Sentry to access your GitHub account
5. Link your repository
6. Now commits will be linked to errors

## Troubleshooting

### DSN Not Working

**Problem**: Events not appearing in Sentry

**Solutions**:

1. Verify DSN is copied correctly (no extra spaces)
2. Check that environment variable is deployed in Render
3. Verify Render service is running: `curl https://your-service.onrender.com/health`
4. Check Render logs for errors
5. Ensure Sentry DSN is public (not private)

### Events Not Appearing

**Problem**: No errors/transactions showing in Sentry

**Solutions**:

1. Generate test error in backend:
   ```bash
   curl https://your-backend/api/nonexistent
   ```
2. Generate test transaction on frontend:
   - Click buttons in the app
   - Open DevTools → Network tab
3. Wait 1-2 minutes for events to process
4. Check Sentry project settings → **Inbound Data Filters**
5. Verify no filters are blocking events

### Performance Data Missing

**Problem**: No transaction data in Performance tab

**Solutions**:

1. Verify Performance Monitoring is enabled
2. Check transaction sample rate (should be > 0%)
3. Generate traffic by using the application
4. Wait 5 minutes for aggregation

## Environment Variables Reference

### Backend (.env)

```dotenv
# Sentry configuration
SENTRY_DSN=https://key@org.ingest.sentry.io/projectid

# Other variables
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-frontend-url
```

### Frontend (.env)

```dotenv
# Sentry configuration
VITE_SENTRY_DSN=https://key@org.ingest.sentry.io/projectid

# Other variables
VITE_API_URL=https://your-backend-url
```

## Next Steps

1. ✅ Set up error tracking (completed)
2. ⏭️ Configure performance monitoring thresholds
3. ⏭️ Set up incident alerts
4. ⏭️ Review dashboards monthly
5. ⏭️ Create runbook for common errors

## Additional Resources

- [Sentry Documentation](https://docs.sentry.io/)
- [Node.js Integration Guide](https://docs.sentry.io/platforms/node/)
- [React Integration Guide](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Performance Monitoring Guide](https://docs.sentry.io/product/performance/)
