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
