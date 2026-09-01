from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.database import get_db
from app.models.course import Course
from app.models.assessment import AssessmentAttempt
from app.services.recommendation_service import recommend_courses

router = APIRouter(prefix="/api/learning", tags=["Learning"])

@router.get("/courses")
def courses(db: Session = Depends(get_db)):
    return db.scalars(select(Course)).all()

@router.get("/recommendations/{official_id}")
def recommendations(official_id: int, db: Session = Depends(get_db)):
    attempt = db.scalar(select(AssessmentAttempt).where(AssessmentAttempt.official_id == official_id).order_by(AssessmentAttempt.submitted_at.desc()))
    gaps = attempt.skill_gaps if attempt else []
    return {"official_id": official_id, "skill_gaps": gaps, "recommendations": recommend_courses(list(db.scalars(select(Course))), gaps)}
