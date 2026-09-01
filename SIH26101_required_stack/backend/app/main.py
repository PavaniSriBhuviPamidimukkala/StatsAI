from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine, settings
from app.routes import official, assessment, skills, learning

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Stats AI Backend", version="0.1.0", description="Backend foundation for the AI-enabled Skill Intelligence & Learning Platform.")
app.add_middleware(CORSMiddleware, allow_origins=[settings.frontend_origin, "http://localhost:3000"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(official.router)
app.include_router(assessment.router)
app.include_router(skills.router)
app.include_router(learning.router)

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "stats-ai-backend"}
