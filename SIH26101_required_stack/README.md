# SIH 26101 — AI-enabled Skill Intelligence & Learning Platform

This version is a **stack-correct rebuild** of the submitted prototype. The frontend is React + TypeScript + Vite + Tailwind CSS; the backend is Python + FastAPI + SQLAlchemy; PostgreSQL/pgvector is supported; the AI layer is structured around scikit-learn, NLP, embeddings, RAG and an LLM integration point.

## Required stack
- React.js, TypeScript, Vite, Tailwind CSS
- Python, FastAPI, SQLAlchemy
- PostgreSQL + pgvector
- Scikit-learn + Sentence Transformers/embeddings
- LLM + RAG integration point
- REST API integration layer for iGOT Karmayogi and NSSTA
- RBAC/OAuth-OIDC-ready architecture
- Docker / cloud-ready deployment

## Functional prototype flow
Profile → Assessment → Competency Profile → Skill Gap → Personalized Recommendation → iGOT/NSSTA Catalogue → Quiz → Performance → Updated Competency → Next Recommendation.

## Frontend pages
Dashboard, Profile, Assessment, Skill Gaps, Learning Path, Courses, AI Quiz, AI Assistant, Admin Analytics.

## Run frontend
```bash
cd frontend
npm install
npm run dev
```

## Run backend
```bash
cd backend
python -m venv .venv
# activate the environment
pip install -r requirements.txt
uvicorn app.main:app --reload
```
API docs: http://127.0.0.1:8000/docs

## Run with Docker
```bash
docker compose up --build
```

## Prototype honesty / integration notes
- iGOT Karmayogi and NSSTA are **mock/API-ready**, because actual approved API credentials/access are not supplied here.
- Quiz generation includes a deterministic fallback. The intended production pipeline is document extraction → chunking → embeddings → pgvector retrieval → LLM/RAG → grounded MCQs.
- Competency scoring in this prototype is a demonstration model, not a validated psychometric assessment.
- OAuth 2.0/OIDC and RBAC are architecture requirements for the next implementation stage; the demo does not claim live government SSO.
