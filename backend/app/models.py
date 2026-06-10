from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database import Base


class PendingIssue(Base):
    __tablename__ = "pending_issues"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String, default="Unknown")
    issue = Column(String)
    assigned_to = Column(String, default="Unassigned")
    priority = Column(String, default="Medium")
    status = Column(String, default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)


class DefectiveGood(Base):
    __tablename__ = "defective_goods"

    id = Column(Integer, primary_key=True, index=True)
    product = Column(String)
    supplier = Column(String, default="Unknown")
    quantity = Column(Integer, default=1)
    status = Column(String, default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)