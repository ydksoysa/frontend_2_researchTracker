# React Auth (TypeScript) - Login & Register

This is a minimal React + TypeScript starter project that implements:
- Login (POST /api/auth/login)
- Register (POST /api/auth/signup)
- JWT token stored in localStorage and attached to axios requests

## Setup
1. Install dependencies:
   ```
   npm install
   ```
2. Start the dev server:
   ```
   npm start
   ```
3. Configure backend URL in `src/api/axiosInstance.ts` (default: http://localhost:8080/api)

## Notes
- This project uses React Router v6.
- Replace backend endpoints if needed to match your Spring Boot server.
