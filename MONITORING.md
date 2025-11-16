# Monitoring and Alerting Setup

## Overview

This document describes the monitoring infrastructure for the MERN stack application deployed on Render.

## Application Health Monitoring

### Health Check Endpoint

**URL**: `https://deployment-and-devops-essentials-mayen007.onrender.com/health`

**Response Format**:

```json
{
  "status": "ok",
  "time": "2025-11-16T10:30:00.000Z",
  "uptime": 3600,
  "memoryUsage": {
    "rss": 51000000,
    "heapTotal": 40000000,
    "heapUsed": 25000000,
    "external": 1000000
  },
  "loadAverage": [0.5, 0.4, 0.3],
  "hostname": "render-container-xyz"
}
```

**Check Interval**: Recommended every 5 minutes

## Error Tracking with Sentry

### Setup Instructions

#### 1. Create Sentry Project

1. Go to [sentry.io](https://sentry.io) and sign up (free tier available)
2. Create a new organization
3. Create two projects:
   - **Project Name**: `mern-backend` (Platform: Node.js)
   - **Project Name**: `mern-frontend` (Platform: React)

#### 2. Get Your DSNs

After creating projects, you'll receive DSN (Data Source Name) strings:

- **Backend DSN**: Format `https://key@org.ingest.sentry.io/project-id`
- **Frontend DSN**: Format `https://key@org.ingest.sentry.io/project-id`

#### 3. Configure Environment Variables

**For Backend (Render Dashboard)**:

1. Go to Render Dashboard → Your Backend Service
2. Settings → Environment
3. Add variable:
   ```
   SENTRY_DSN=https://your-backend-dsn-here
   ```

**For Frontend (Render Dashboard)**:

1. Go to Render Dashboard → Your Frontend Service
2. Settings → Environment
3. Add variable:
   ```
   VITE_SENTRY_DSN=https://your-frontend-dsn-here
   ```

#### 4. Verify Integration

**Backend**:

```bash
curl https://deployment-and-devops-essentials-mayen007.onrender.com/health
```

If Sentry is working, errors will appear in your Sentry dashboard.

**Frontend**:

- Open https://deployment-and-devops-essentials-mayen007-vu4l.onrender.com/
- Check browser console for Sentry initialization message
- Test: Click "Load extra UI" button and interact with the app

### Sentry Dashboard Features

1. **Error Tracking**

   - Real-time error notifications
   - Error grouping and deduplication
   - Stack trace analysis

2. **Performance Monitoring**

   - Request latency tracking
   - Database query performance
   - Component render times

3. **Release Tracking**

   - Associate errors with specific releases
   - Rollback identification

4. **Alerts**
   - Set up alerts for spike detection
   - Custom error conditions
   - Slack/email notifications

## Uptime Monitoring

### UptimeRobot Configuration (Free Tier)

UptimeRobot monitors if your application is accessible:

#### 1. Setup Account

1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Sign up (free tier: up to 50 monitors)
3. Create a new monitor

#### 2. Configure Monitor

**Monitor Type**: HTTP(s)

**Backend Monitor**:

```
URL: https://deployment-and-devops-essentials-mayen007.onrender.com/health
Friendly Name: MERN Backend Health
Check Interval: 5 minutes
Alert Contacts: (Your email)
```

**Frontend Monitor**:

```
URL: https://deployment-and-devops-essentials-mayen007-vu4l.onrender.com/
Friendly Name: MERN Frontend
Check Interval: 5 minutes
Alert Contacts: (Your email)
```

#### 3. Enable Notifications

- Email alerts on downtime
- Optional: Slack/Discord webhooks
- Create incident reports

## Performance Monitoring

### Backend Performance

The backend collects performance metrics via:

1. **Morgan Logging**

   - HTTP request/response logging
   - Response times
   - Status codes

2. **Winston Logger**

   - Application-level logging
   - Error tracking
   - Performance metrics

3. **Sentry Transactions**
   - Request tracing
   - Database query monitoring
   - Error context

**View Logs**:

```bash
# Render Logs
curl -H "Authorization: Bearer $RENDER_API_KEY" \
  https://api.render.com/v1/services/$SERVICE_ID/events
```

### Frontend Performance

The frontend performance is tracked via:

1. **Sentry Performance Monitoring**

   - Page load times
   - Transaction tracing
   - Component performance

2. **Browser Metrics**

   - Core Web Vitals (LCP, FID, CLS)
   - First Contentful Paint (FCP)
   - Interaction to Paint (INP)

3. **Caching Effectiveness**
   - Cache hit rates
   - Asset delivery times
   - Bundle size metrics

## API Performance Tracking

### Endpoint Monitoring

Key endpoints to monitor:

| Endpoint              | Purpose              | SLA               |
| --------------------- | -------------------- | ----------------- |
| `/health`             | System health        | <500ms            |
| `/api/hello`          | Backend connectivity | <200ms            |
| Render service status | Platform health      | Monitor dashboard |

### Performance Benchmarks

- **Backend response time**: Target <200ms
- **Frontend load time**: Target <2s
- **API latency**: Target <500ms
- **Database query**: Target <100ms

## Alerting Strategy

### Alert Severity Levels

1. **Critical (Immediate Action)**

   - Service down (HTTP 5xx)
   - Database connection failure
   - High error rate (>5% of requests)

2. **Warning (Within 1 hour)**

   - Slow response times (>1s average)
   - Memory usage >80%
   - High CPU usage >90%

3. **Info (Next business day)**
   - Deployment events
   - Performance optimization opportunities
   - Log aggregation summaries

### Notification Channels

- **Email**: Critical and warning alerts
- **Slack** (optional): Real-time status updates
- **PagerDuty** (optional): On-call escalation

## Dashboard Setup

### Recommended Dashboard Tools

1. **Grafana** (Open source)

   - Aggregate metrics from multiple sources
   - Custom dashboards
   - Alert rules

2. **DataDog** (Paid, free tier limited)

   - APM and infrastructure monitoring
   - Logs and traces
   - Alerts

3. **New Relic** (Paid, free tier available)
   - Application performance monitoring
   - Infrastructure monitoring
   - Custom events

## Maintenance and Testing

### Monthly Monitoring Health Check

```bash
# Test health endpoint
curl https://deployment-and-devops-essentials-mayen007.onrender.com/health

# Check Sentry project
# - Log in to Sentry dashboard
# - Verify recent events
# - Review performance metrics

# Test UptimeRobot
# - Verify all monitors are active
# - Review uptime reports
# - Test alert notifications
```

### Annual Review

- Analyze trends in error rates
- Review SLA compliance
- Update alert thresholds
- Assess monitoring tool effectiveness

## Troubleshooting

### Sentry not capturing errors

1. Verify DSN is correctly set
2. Check browser console for Sentry errors
3. Ensure environment variable is deployed
4. Check network tab for blocked requests

### UptimeRobot showing downtime

1. Verify health endpoint is responding
2. Check Render service logs
3. Verify environment variables
4. Check database connection

### High memory usage

1. Check for memory leaks in application
2. Review large data transfers
3. Monitor database connection pool
4. Consider vertical scaling on Render

## Additional Resources

- [Sentry Documentation](https://docs.sentry.io/)
- [UptimeRobot Documentation](https://uptimerobot.com/help/)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React Performance](https://react.dev/reference/react/Profiler)
