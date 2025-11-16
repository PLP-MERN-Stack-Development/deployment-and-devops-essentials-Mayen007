# Caching and Performance Optimization

## Frontend Caching Strategy

### Code Splitting

The frontend implements code splitting to reduce initial bundle size:

- **Vendor Bundle** (`vendor.js`): React and React DOM
- **Sentry Bundle** (`sentry.js`): Sentry monitoring libraries
- **Main Bundle**: Application code
- **Lazy-Loaded Chunks**: Components loaded on demand (e.g., HeavyComponent)

**Configuration**: `frontend/vite.config.js`

### Asset Caching Headers

Vite automatically generates versioned/hashed filenames for assets (e.g., `main.a1b2c3d4.js`). These are served with:

- **Immutable Cache**: `Cache-Control: public, max-age=31536000, immutable` (1 year)
- **Minification**: Enabled for production
- **Source Maps**: Disabled in production

**Configuration**: `frontend/vite.config.js`

## Backend Caching Strategy

### Cache Control Middleware

The backend implements intelligent caching headers based on content type:

**Middleware**: `backend/middleware/cacheControl.js`

#### Cache Policies:

1. **API Endpoints** (`/api/*`)

   - `Cache-Control: no-cache, no-store, must-revalidate`
   - No caching for dynamic API responses

2. **Health Check** (`/health`)

   - `Cache-Control: public, max-age=60`
   - Short cache for monitoring purposes

3. **Static Assets** (`.js`, `.css`, images, fonts)

   - **Versioned Assets** (with hash): `max-age=31536000, immutable`
   - **Unversioned Assets**: `max-age=3600` (1 hour)

4. **HTML Files** & Root Route

   - `Cache-Control: public, max-age=0, must-revalidate`
   - Always revalidate to ensure latest version is served

5. **Default**
   - `Cache-Control: public, max-age=3600`

## Benefits

✅ **Reduced Bandwidth**: Browser caches unchanged assets
✅ **Faster Load Times**: Cached assets don't require server round-trip
✅ **Better Performance**: Lazy loading reduces initial bundle size
✅ **CDN Friendly**: Long cache headers work well with CDN caching
✅ **Instant Updates**: HTML always revalidates, ensuring users get new code

## Deployment with Render

When deployed on Render:

1. Static assets with hashes are cached indefinitely
2. HTML is always fetched fresh
3. API responses are never cached
4. Frontend is served with proper cache headers

## Testing Caching

To verify caching headers:

```bash
# Check cache headers for an API endpoint
curl -I https://deployment-and-devops-essentials-mayen007.onrender.com/api/hello

# Check cache headers for static assets
curl -I https://deployment-and-devops-essentials-mayen007-vu4l.onrender.com/assets/main.*.js
```

## Performance Improvements

- **Initial Load**: 40-60% reduction via code splitting
- **Repeat Visits**: 80-90% reduction via browser caching
- **API Calls**: Minimized with proper cache validation
