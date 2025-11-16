export default {
  build: {
    // Code splitting configuration for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'sentry': ['@sentry/react', '@sentry/tracing'],
        },
      },
    },
    // Optimize chunk size for production
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    sourcemap: false,
  },
  // Development server configuration
  server: {
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
};