from fastapi import APIRouter
from pydantic import BaseModel
from app.database import SessionLocal
from app.models import PendingIssue

router = APIRouter()


class PendingIssueCreate(BaseModel):
    company: str
    issue: str
    assignedTo: str
    priority: str
    status: str
    daysOpen: int


@router.get("/pending")
def get_pending_issues():
    db = SessionLocal()

    try:
        issues = db.query(PendingIssue).all()

        return [
            {
                "id": item.id,
                "company": item.company,
                "issue": item.issue,
                "assignedTo": item.assigned_to,
                "priority": item.priority,
                "status": item.status,
                "daysOpen": item.days_open,
            }
            for item in issues
        ]

    finally:
        db.close()


@router.post("/pending")
def create_pending_issue(issue: PendingIssueCreate):
    db = SessionLocal()

    try:
        new_issue = PendingIssue(
            company=issue.company,
            issue=issue.issue,
            assigned_to=issue.assignedTo,
            priority=issue.priority,
            status=issue.status,
            days_open=issue.daysOpen,
        )

        db.add(new_issue)
        db.commit()
        db.refresh(new_issue)

        return {
            "id": new_issue.id,
            "company": new_issue.company,
            "issue": new_issue.issue,
            "assignedTo": new_issue.assigned_to,
            "priority": new_issue.priority,
            "status": new_issue.status,
            "daysOpen": new_issue.days_open,
        }

    finally:
        db.close()