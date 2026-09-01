from sqlalchemy import String, Integer, Float, Text
from sqlalchemy.orm import Mapped, mapped_column
from .db import Base
class OfficialProfile(Base):
    __tablename__='official_profiles'
    id:Mapped[int]=mapped_column(Integer,primary_key=True)
    name:Mapped[str]=mapped_column(String(120)); designation:Mapped[str]=mapped_column(String(120))
    department:Mapped[str]=mapped_column(String(160)); assignment:Mapped[str]=mapped_column(String(240))
    education:Mapped[str]=mapped_column(String(240)); experience:Mapped[int]=mapped_column(Integer,default=0); training:Mapped[str]=mapped_column(Text,default='')
class Competency(Base):
    __tablename__='competencies'
    id:Mapped[int]=mapped_column(Integer,primary_key=True); name:Mapped[str]=mapped_column(String(120),unique=True)
    category:Mapped[str]=mapped_column(String(80)); current:Mapped[float]=mapped_column(Float,default=0); required:Mapped[float]=mapped_column(Float,default=70)
class Course(Base):
    __tablename__='courses'
    id:Mapped[int]=mapped_column(Integer,primary_key=True); title:Mapped[str]=mapped_column(String(200)); skill:Mapped[str]=mapped_column(String(120))
    source:Mapped[str]=mapped_column(String(80)); duration:Mapped[str]=mapped_column(String(40)); level:Mapped[str]=mapped_column(String(40)); description:Mapped[str]=mapped_column(Text,default='')
class LearningContent(Base):
    __tablename__='learning_content'
    id:Mapped[int]=mapped_column(Integer,primary_key=True); filename:Mapped[str]=mapped_column(String(255)); text:Mapped[str]=mapped_column(Text); embedding_json:Mapped[str|None]=mapped_column(Text,nullable=True)
