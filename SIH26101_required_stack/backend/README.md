# Stats AI Backend — Stage 1

FastAPI backend foundation for the existing Stats AI React frontend.

## Run locally

1. Create a virtual environment:
   `python -m venv .venv`
2. Activate it.
3. Install:
   `pip install -r requirements.txt`
4. Copy `.env.example` to `.env`.
5. For the first test, SQLite is supported automatically if DATABASE_URL is omitted. For PostgreSQL, set DATABASE_URL to your PostgreSQL connection string.
6. Start:
   `uvicorn app.main:app --reload`

API docs: `http://localhost:8000/docs`
Health: `http://localhost:8000/api/health`

## Stage 1 APIs

- POST /api/official/profile
- GET /api/official/profile/{official_id}
- POST /api/assessment/submit
- GET /api/skills/profile/{official_id}
- GET /api/skills/gaps/{official_id}
- GET /api/learning/courses
- GET /api/learning/recommendations/{official_id}

## Important

This backend does not claim live iGOT or NSSTA API access. Those will be implemented behind integration adapters after official API/access details are available. AI/RAG services will be added in the next stage.
