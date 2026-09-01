from datetime import datetime
from sqlalchemy import Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base

class AssessmentAttempt(Base):
    __tablename__ = "assessment_attempts"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    official_id: Mapped[int] = mapped_column(ForeignKey("officials.id"), index=True)
    score: Mapped[float] = mapped_column()
    topic_scores: Mapped[dict] = mapped_column(JSON, default=dict)
    skill_gaps: Mapped[list] = mapped_column(JSON, default=list)
    submitted_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
