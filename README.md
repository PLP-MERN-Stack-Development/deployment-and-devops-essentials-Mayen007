# Deployment and DevOps for MERN Applications

This assignment focuses on deploying a full MERN stack application to production, implementing CI/CD pipelines, and setting up monitoring for your application.

## Assignment Overview

You will:

1. Prepare your MERN application for production deployment
2. Deploy the backend to a cloud platform
3. Deploy the frontend to a static hosting service
4. Set up CI/CD pipelines with GitHub Actions
5. Implement monitoring and maintenance strategies

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week7-Assignment.md` file
4. Use the provided templates and configuration files as a starting point

## Files Included

- `Week7-Assignment.md`: Detailed assignment instructions
- `.github/workflows/`: GitHub Actions workflow templates
- `deployment/`: Deployment configuration files and scripts
- `.env.example`: Example environment variable templates
- `monitoring/`: Monitoring configuration examples

## Requirements

- A completed MERN stack application from previous weeks
- Accounts on the following services:
  - GitHub
  - MongoDB Atlas
  - Render, Railway, or Heroku (for backend)
  - Vercel, Netlify, or GitHub Pages (for frontend)
- Basic understanding of CI/CD concepts

## Deployment Platforms

### Backend Deployment Options

- **Render**: Easy to use, free tier available
- **Railway**: Developer-friendly, generous free tier
- **Heroku**: Well-established, extensive documentation

### Frontend Deployment Options

- **Vercel**: Optimized for React apps, easy integration
- **Netlify**: Great for static sites, good CI/CD
- **GitHub Pages**: Free, integrated with GitHub

## CI/CD Pipeline

The assignment includes templates for setting up GitHub Actions workflows:

- `frontend-ci.yml`: Tests and builds the React application
- `backend-ci.yml`: Tests the Express.js backend
- `frontend-cd.yml`: Deploys the frontend to your chosen platform
- `backend-cd.yml`: Deploys the backend to your chosen platform

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all deployment tasks
2. Set up CI/CD pipelines with GitHub Actions
3. Deploy both frontend and backend to production
4. Document your deployment process in the README.md
5. Include screenshots of your CI/CD pipeline in action
6. Add URLs to your deployed applications

## 🌐 Deployed Application

### Live URLs

- **Frontend**: https://deployment-and-devops-essentials-mayen007-vu4l.onrender.com/
- **Backend API**: https://deployment-and-devops-essentials-mayen007.onrender.com
- **Health Check**: https://deployment-and-devops-essentials-mayen007.onrender.com/health

### Deployment Status

✅ **Backend**: Deployed to Render
✅ **Frontend**: Deployed to Render
✅ **CI/CD Pipeline**: GitHub Actions configured
✅ **Database**: MongoDB Atlas (week7)
✅ **Monitoring**: Sentry + Health endpoints ready

### Deployment Configuration

- Backend uses `render.yaml` for deployment configuration
- Continuous deployment is triggered on push to main branch
- Environment variables are configured in Render dashboard
- Frontend deployment via GitHub Actions workflow: `.github/workflows/frontend-deploy.yml`
- Backend deployment via GitHub Actions workflow: `.github/workflows/backend-deploy.yml`

## 📊 Monitoring & Observability

### Health Monitoring

The application exposes a comprehensive health check endpoint:

**Endpoint**: `GET https://deployment-and-devops-essentials-mayen007.onrender.com/health`

**Response includes**:

- Server status
- Uptime
- Memory usage
- Load average
- Hostname

### Error Tracking with Sentry

**Backend**: Integrated with `@sentry/node`

- Automatic error capture
- Request tracing
- Performance monitoring

**Frontend**: Integrated with `@sentry/react`

- Error boundary tracking
- Component performance metrics
- User session tracking

**Setup Instructions**: See `MONITORING.md`

### Uptime Monitoring

Recommended: Use UptimeRobot or Pingdom to monitor:

- Health endpoint every 5 minutes
- Frontend availability
- API responsiveness

**Free tier**: UptimeRobot (50 monitors)

### Performance Monitoring

**Backend Metrics**:

- Request/response times (Morgan logging)
- Application errors (Winston + Sentry)
- Database query performance
- System resource usage

**Frontend Metrics**:

- Page load times
- Code split chunk loading
- Component render performance
- Cache effectiveness

**Documentation**: See `MONITORING.md` and `CACHING_STRATEGY.md`

## 🔄 CI/CD Pipeline

### Workflows

**Backend CI**: `.github/workflows/backend-ci.yml`

- Triggers on: `push` to main, `pull_request`
- Steps: Install → Lint → Test → Build

**Backend Deploy**: `.github/workflows/backend-deploy.yml`

- Triggers on: `push` to main, `workflow_dispatch`
- Steps: Check secrets → Build → Deploy to Render → Health check

**Frontend CI**: `.github/workflows/frontend-ci.yml`

- Triggers on: `push` to main, `pull_request`
- Steps: Install → Lint → Test → Build

**Frontend Deploy**: `.github/workflows/frontend-deploy.yml`

- Triggers on: `push` to main, `workflow_dispatch`
- Steps: Checkout → Install → Lint → Test → Build → Deploy to Render

### GitHub Secrets Required

Set these in GitHub repository settings (Settings → Secrets and variables → Actions):

```
RENDER_API_KEY           # Your Render API key
RENDER_SERVICE_ID        # Backend service ID on Render
RENDER_SERVICE_ID_FRONTEND # Frontend service ID on Render
```

### CI/CD Pipeline Screenshots

To add screenshots:

1. Go to GitHub → Actions tab
2. View workflow runs
3. Screenshot the successful build/deployment

**Example Workflow Status**:

- Backend CI: ✅ Passed
- Backend Deploy: ✅ Deployed
- Frontend CI: ✅ Passed
- Frontend Deploy: ✅ Deployed

## 📚 Documentation

- **`CACHING_STRATEGY.md`**: Asset caching and code splitting strategy
- **`MONITORING.md`**: Error tracking, uptime monitoring, performance metrics
- **`SENTRY_SETUP.md`**: Complete Sentry configuration guide
- **`IMPLEMENTATION_REVIEW.md`**: Detailed assignment compliance review
- **`Week7-Assignment.md`**: Original assignment requirements

## 🚀 Getting Started with Monitoring

### Quick Start

1. **Enable Error Tracking**:

   - Follow `SENTRY_SETUP.md` to create Sentry projects
   - Add DSN environment variables to Render
   - Verify integration

2. **Set Up Uptime Monitoring**:

   - Go to [UptimeRobot](https://uptimerobot.com)
   - Add health endpoint monitors
   - Configure email alerts

3. **View Logs & Metrics**:
   - Backend health: `https://deployment-and-devops-essentials-mayen007.onrender.com/health`
   - Sentry dashboard: Check error trends
   - Render dashboard: View deployment logs

### Deployment & CI/CD

**To trigger deployment**:

```bash
git push origin main
# GitHub Actions workflows automatically run
# Frontend and backend deploy to Render
```

**To manually trigger**:

1. Go to GitHub → Actions
2. Select workflow (Frontend/Backend Deploy)
3. Click "Run workflow" → "Run workflow"

## Resources

# Workspace skeleton added

This repository previously contained only the assignment instructions. A minimal MERN skeleton has been added to help complete Week 7 tasks and demonstrate deployment/CI integrations.

- `backend/`: minimal Express server with health route and optional MongoDB connection; `.env.example` is provided.
- `frontend/`: minimal Vite + React app with example `VITE_API_URL` in `.env.example`.
- `.github/workflows/`: simple CI templates for backend and frontend so you can demonstrate GitHub Actions.
  -Quick commands to run the skeleton locally:

```powershell
cd backend; npm install; npm run dev
# in another shell
cd frontend; npm install; npm run dev
```

Next steps: wire your real application code into `frontend/` and `backend/`, update `.env` values, and configure your chosen hosts (Render/Vercel/Netlify) for deployment. Replace placeholder scripts with real lint/test commands when ready.

Note: Docker support was removed from this repository at the user's request. If you need containerized workflows later, add a `Dockerfile` and `docker-compose.yml` back to the repo and update CI accordingly.
