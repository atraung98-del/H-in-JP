# H-in-JP Frontend

React and Vite frontend for the room-rental platform. The Go API in the separate `startup/backend` project is the supported backend.

## Project setup

Run from this repository:

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

The frontend normally opens at `http://localhost:5173`. The local `.env` should contain:

```dotenv
VITE_API_BASE_URL=http://localhost:8080/api
```

The Go backend must include the frontend origin in `CORS_ALLOWED_ORIGINS`.

## Authentication design

- Registration sends `email`, `password`, `full_name`, and `profile_type` to the Go API.
- Registration is followed by login because registration intentionally does not create a session.
- The access token exists only in React memory.
- The refresh token remains in the Go API's HTTP-only cookie and is never read by JavaScript.
- App startup uses `/auth/refresh` to restore a valid cookie-backed session.
- Protected requests send the access token with the Bearer scheme and retry once after refresh on `401`.
- Logout revokes the refresh token, clears the cookie, and clears React's session.
- Homeowner screens trust only the API-provided `profile_type`.

Never store either token in `localStorage` or `sessionStorage`.

## Quality checks

```powershell
npm run lint
npm run test
npm run build
```

# Original Vite notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
