
## Running locally
- Duplicate `.env.example` as `.env.local` and populate the key(s)
- Run `pnpm i` to install node modules
- Run `pnpm dev` to run the development server
- The frontend should be accessible at http://localhost:3000

## Deployment
The application is deployed via Vercel and is accessible on https://fun-xyz.vercel.app/.

## Assumptions
1. That the API key given is not a secret key, that it is ok to be used directly on the frontend. If not, we should access the API through a proxy backend.
2. We will use a hardcoded list of tokens as it is not documented which tokens are supported by the API.

## Design choices
1. Used a dark theme to match most Crypto apps, as well as the fun.xyz site.
2. Chose to display elements step by step so as not to overload the user at the start.
3. The "I want to convert..." format acts as a guide for the user to explain what is happening on the page.
4. The bidirectional arrow between the token selects, allow the user to swap the two tokens.

## Library choices
- `next`: Next.js framework for its performance, developer experience, and integration with Vercel (for deployments).
- `@mui/material`: Material UI as the UI library for its simplicity and popularity.
- `@tanstack/react-query`: Tanstack Query to manage API requests. Using this for data/loading/error state management, request retries, cached results.
