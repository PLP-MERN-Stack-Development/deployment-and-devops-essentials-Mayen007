/**
 * Cache Control Middleware
 * Sets appropriate cache headers for different types of assets and responses
 */
module.exports = function cacheControl(req, res, next) {
  // Set cache headers based on content type and route

  // API responses should not be cached (or have short cache)
  if (req.path.startsWith('/api/')) {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.set('Pragma', 'no-cache')
    res.set('Expires', '0')
  }
  // Health check endpoint - short cache
  else if (req.path === '/health') {
    res.set('Cache-Control', 'public, max-age=60')
  }
  // Static assets - long cache with versioning
  else if (req.path.match(/\.(js|css|woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif|webp)$/i)) {
    // For versioned/hashed assets, use long cache
    if (req.path.match(/\.[a-f0-9]{8}\./i)) {
      res.set('Cache-Control', 'public, max-age=31536000, immutable')
    } else {
      // For non-versioned assets, use moderate cache
      res.set('Cache-Control', 'public, max-age=3600')
    }
  }
  // HTML files - no cache or revalidate
  else if (req.path.match(/\.html$/i) || req.path === '/') {
    res.set('Cache-Control', 'public, max-age=0, must-revalidate')
  }
  // Default for other responses
  else {
    res.set('Cache-Control', 'public, max-age=3600')
  }

  next()
}
