from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base

class Course(Base):
    __tablename__ = "courses"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200))
    provider: Mapped[str] = mapped_column(String(80))
    topic: Mapped[str] = mapped_column(String(100))
    level: Mapped[str] = mapped_column(String(40), default="Intermediate")
    url: Mapped[str] = mapped_column(String(500), default="")
