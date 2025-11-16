# GitHub Secrets Setup Guide

## Required Secrets for CI/CD Pipelines

Your GitHub Actions workflows require 3 secrets to be configured. Follow these steps:

---

## Step 1: Get Your Render Service IDs

### Find Frontend Service ID

1. Go to https://dashboard.render.com
2. Click on your **Frontend Service** (deployment-and-devops-essentials-mayen007-vu4l)
3. Look at the URL: `https://dashboard.render.com/services/[SERVICE_ID]`
4. Copy the `SERVICE_ID` part

### Find Backend Service ID

1. Click on your **Backend Service** (deployment-and-devops-essentials-mayen007)
2. Look at the URL: `https://dashboard.render.com/services/[SERVICE_ID]`
3. Copy the `SERVICE_ID` part

### Find Your Render API Key

1. Go to https://dashboard.render.com
2. Click your profile (top right) → **Account Settings**
3. Go to **API Keys** tab
4. Click **Create API Key** if you don't have one
5. Copy the API key

---

## Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret**

### Add 3 Secrets:

#### Secret 1: RENDER_API_KEY

```
Name: RENDER_API_KEY
Value: [Your Render API Key from Step 1]
```

Click **Add secret**

#### Secret 2: RENDER_SERVICE_ID

```
Name: RENDER_SERVICE_ID
Value: [Your Backend Service ID from Step 1]
```

Click **Add secret**

#### Secret 3: RENDER_SERVICE_ID_FRONTEND

```
Name: RENDER_SERVICE_ID_FRONTEND
Value: [Your Frontend Service ID from Step 1]
```

Click **Add secret**

---

## Verification

After adding all 3 secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. You should see all 3 secrets listed (values hidden)
3. Now push to main branch to trigger workflows

---

## What Each Secret Does

| Secret                       | Used By         | Purpose                                     |
| ---------------------------- | --------------- | ------------------------------------------- |
| `RENDER_API_KEY`             | Both workflows  | Authenticates with Render API               |
| `RENDER_SERVICE_ID`          | Backend Deploy  | Identifies which backend service to deploy  |
| `RENDER_SERVICE_ID_FRONTEND` | Frontend Deploy | Identifies which frontend service to deploy |

---

## Troubleshooting

### "Secret not found" error

- Make sure you typed the secret name exactly as shown above
- Secret names are case-sensitive
- Give it a minute for GitHub to sync

### Workflows still failing

1. Click on the failed workflow in **Actions** tab
2. Click the failed job to see details
3. Check if all 3 secrets appear in the output
4. Verify API key is still valid in Render dashboard

### How to get Service IDs again

If you forget your service IDs:

1. Render Dashboard → Services
2. Click on service → URL shows the ID
3. Or check Render API: https://api.render.com/v1/services (requires auth)

---

## Next Steps

1. ✅ Add all 3 GitHub secrets
2. Push a commit to main branch
3. Go to **Actions** tab to watch workflows run
4. Both frontend and backend should deploy automatically

Once workflows succeed, your services will auto-update on every push to main! 🚀
