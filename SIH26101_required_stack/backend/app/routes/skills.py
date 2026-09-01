from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.database import get_db
from app.models.official import Official
from app.models.assessment import AssessmentAttempt

router = APIRouter(prefix="/api/skills", tags=["Skills"])

@router.get("/profile/{official_id}")
def skill_profile(official_id: int, db: Session = Depends(get_db)):
    if not db.get(Official, official_id): raise HTTPException(404, "Official not found")
    attempt = db.scalar(select(AssessmentAttempt).where(AssessmentAttempt.official_id == official_id).order_by(AssessmentAttempt.submitted_at.desc()))
    return {"official_id": official_id, "overall_score": attempt.score if attempt else 0, "topic_scores": attempt.topic_scores if attempt else {}, "skill_gaps": attempt.skill_gaps if attempt else []}

@router.get("/gaps/{official_id}")
def skill_gaps(official_id: int, db: Session = Depends(get_db)):
    profile = skill_profile(official_id, db)
    return {"official_id": official_id, "skill_gaps": profile["skill_gaps"]}
