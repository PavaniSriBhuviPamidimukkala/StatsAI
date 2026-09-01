from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.official import Official
from app.schemas.official import OfficialCreate, OfficialOut

router = APIRouter(prefix="/api/official", tags=["Official"])

@router.post("/profile", response_model=OfficialOut)
def create_profile(payload: OfficialCreate, db: Session = Depends(get_db)):
    official = Official(**payload.model_dump())
    db.add(official); db.commit(); db.refresh(official)
    return official

@router.get("/profile/{official_id}", response_model=OfficialOut)
def get_profile(official_id: int, db: Session = Depends(get_db)):
    official = db.get(Official, official_id)
    if not official:
        raise HTTPException(404, "Official not found")
    return official
