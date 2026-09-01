# Netlify deployment

This repository is configured for a Vite SPA hosted by Netlify.

## Site settings

Use the GitHub repository `Mwaqarulmulk/waqar-ai-portfolio` and the `main` branch. Netlify should use the repository root as the base directory, run `pnpm build`, and publish `dist/public`. The committed `netlify.toml` contains these defaults, so the Netlify UI can leave Base directory blank and use the detected configuration.

If the site still shows an unrelated CV or Netlify's generic 404 page, the Netlify site is connected to a different repository or publish directory. Reconnect the site to this repository, or create a new Netlify site from this repository. Do not publish the repository root or `client`; the generated site is in `dist/public`.

## Environment variables

The public portfolio does not require a client-side API key to render. Do not add `GROQ_API_KEY` as a `VITE_` variable and never expose it to browser code.

The recruiter assistant uses the Express/tRPC server bundled by this project. A standard Netlify static deploy serves the frontend only; it does not run the bundled Express server. The site remains usable without the assistant, while live chatbot responses require either the built-in Manus deployment or a separately configured Netlify Function/server deployment that keeps the Groq key server-side.

## Local verification

Run `pnpm install --frozen-lockfile`, then `pnpm build`. The expected frontend output is `dist/public/index.html`. The SPA fallback is provided by both `netlify.toml` and `client/public/_redirects`, allowing direct navigation and refreshes on client-side routes.
