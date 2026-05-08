# NexusOps AI

Enterprise operations intelligence platform scaffold with a FastAPI backend, React/Vite frontend, and Dockerized data services.

## Stack

- Backend: FastAPI, SQLAlchemy, WebSockets
- Frontend: React, Vite, TypeScript, React Router, Axios, TailwindCSS
- Data: PostgreSQL, Neo4j, Redis, ChromaDB
- Deployment: Docker Compose

## Project Layout

```text
backend/
  app/
    api/
    services/
    models/
    schemas/
    db/
    ai/
    graph/
    websocket/
    auth/
    utils/
frontend/
  src/
    pages/
    components/
    services/
    hooks/
    layouts/
    charts/
    graph/
    auth/
scripts/
```

## Quick Start

1. Copy `.env.example` to `.env`.
2. Start the data services:
   `docker compose up -d postgres redis neo4j chromadb`
3. Backend:
   `python -m venv .venv`
   `.venv\Scripts\activate`
   `pip install -r backend/requirements.txt`
   `uvicorn app.main:app --reload --app-dir backend`
4. Frontend:
   `cd frontend`
   `npm install`
   `npm run dev`

## Current Scope

- API health, auth, dashboard summary, incidents, and AI summary endpoints
- SQLite-backed local persistence by default
- Seeded admin login from `.env`
- WebSocket incident feed scaffold
- Frontend dashboard and incident pages
- Dockerized local dependencies

## Next Build Steps

- Add JWT authentication and role enforcement
- Expand SQLAlchemy models and Alembic migrations
- Integrate OpenAI, incident embeddings, and graph sync
- Add charts, React Flow dependency graph, and test coverage

## Vercel Deployment

Deploy this monorepo as two separate Vercel projects:

- Backend project root: `backend`
- Frontend project root: `frontend`

Production notes:

- Do not use SQLite on Vercel
- Set `DATABASE_URL` to hosted Postgres
- Set frontend `VITE_API_BASE_URL` to the backend project's `/api` URL
