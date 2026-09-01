from pydantic import BaseModel, ConfigDict

class CourseOut(BaseModel):
    id: int
    title: str
    provider: str
    topic: str
    level: str
    url: str
    model_config = ConfigDict(from_attributes=True)
