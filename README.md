# Power Bank Rental Frontend

A React prototype for browsing rental stations, choosing slots and following a power-bank rental and payment flow.

## What this project demonstrates

Multi-screen UI, routing, authentication state, API integration and rental status.

## Run locally

```bash
npm ci
npm start
```

Create React App normally serves the development app at `http://localhost:3000`.
`npm run build` produces a static build. The existing `npm test` script does not by itself establish application test coverage.

Companion backend: [power-bank-backend](https://github.com/MohammedAli201/power-bank-backend). Review `src/config/config.js` and the service modules before connecting to any server.

## Code guide

`src/components/` contains rental and account screens; `src/SlotSelection/` handles slots; `src/services/` contains payment and connection helpers.

## Status

Integration prototype. Requires the companion backend and provider configuration. Do not send real payments when evaluating this portfolio project.

Dependencies are recorded in `package-lock.json`. The original framework generation is retained; no claim of a current production dependency audit is made.
