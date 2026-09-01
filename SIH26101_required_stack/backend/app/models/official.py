from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base

class Official(Base):
    __tablename__ = "officials"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120))
    designation: Mapped[str] = mapped_column(String(120))
    department: Mapped[str] = mapped_column(String(160), default="Official Statistics")
    experience_years: Mapped[int] = mapped_column(Integer, default=0)
    education: Mapped[str] = mapped_column(String(200), default="")
