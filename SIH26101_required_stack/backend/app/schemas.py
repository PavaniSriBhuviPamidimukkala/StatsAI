from pydantic import BaseModel
class ProfileIn(BaseModel):
    name:str; designation:str; department:str; assignment:str; education:str; experience:int; training:str
class AssessmentIn(BaseModel):
    answers:list[int]
class QuizGenerateIn(BaseModel):
    content:str; count:int=5
