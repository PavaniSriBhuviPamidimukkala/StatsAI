from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.official import Official
from app.models.assessment import AssessmentAttempt
from app.schemas.assessment import AssessmentSubmit, AssessmentOut
from app.services.assessment_service import calculate_skill_gaps

router = APIRouter(prefix="/api/assessment", tags=["Assessment"])

@router.post("/submit", response_model=AssessmentOut)
def submit_assessment(payload: AssessmentSubmit, db: Session = Depends(get_db)):
    if not db.get(Official, payload.official_id):
        raise HTTPException(404, "Official not found")
    score = round(sum(float(v) for v in payload.topic_scores.values()) / len(payload.topic_scores), 2) if payload.topic_scores else 0.0
    gaps = calculate_skill_gaps(payload.topic_scores)
    attempt = AssessmentAttempt(official_id=payload.official_id, score=score, topic_scores=payload.topic_scores, skill_gaps=gaps)
    db.add(attempt); db.commit(); db.refresh(attempt)
    return attempt
