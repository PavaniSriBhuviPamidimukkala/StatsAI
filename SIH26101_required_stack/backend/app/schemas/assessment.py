from pydantic import BaseModel, Field
from typing import Any

class AssessmentSubmit(BaseModel):
    official_id: int
    answers: dict[str, Any] = Field(default_factory=dict)
    topic_scores: dict[str, float] = Field(default_factory=dict)

class AssessmentOut(BaseModel):
    id: int
    official_id: int
    score: float
    topic_scores: dict
    skill_gaps: list
