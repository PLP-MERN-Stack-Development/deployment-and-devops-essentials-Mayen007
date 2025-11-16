# Frontend: Environment & Build Notes

This frontend uses Vite. Key points:

- Environment variables exposed to client must be prefixed with `VITE_` (e.g. `VITE_API_URL`).
- For local development, copy `.env.example` to `.env` and set `VITE_API_URL`.
- For staging/production, set the corresponding env vars in your hosting platform (Vercel, Netlify, GitHub Pages with build settings).

Build & deploy

- Local build: `npm run build` will produce optimized static assets in `dist/`.
- Host platforms like Vercel/Netlify will run the build step automatically when connected to GitHub.

Code-splitting

- The app demonstrates lazy-loaded components using `React.lazy()`; Vite will emit separate chunks during build.
