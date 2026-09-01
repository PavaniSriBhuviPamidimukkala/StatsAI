from pydantic import BaseModel, ConfigDict

class OfficialCreate(BaseModel):
    name: str
    designation: str
    department: str = "Official Statistics"
    experience_years: int = 0
    education: str = ""

class OfficialOut(OfficialCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)
