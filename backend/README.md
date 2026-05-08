# Backend Deployment Notes

## Vercel

- Set the Vercel project root directory to `backend`
- The FastAPI entrypoint for Vercel is `app/index.py`
- Use a hosted PostgreSQL database in production

## Required Environment Variables

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_ALGORITHM`
- `ACCESS_TOKEN_EXPIRE_MINUTES`
- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`
- `OPENAI_API_KEY`
- `CORS_ORIGINS`
- `CORS_ORIGIN_REGEX`
