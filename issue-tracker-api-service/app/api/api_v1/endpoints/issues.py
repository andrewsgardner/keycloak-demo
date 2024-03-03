from fastapi import APIRouter, HTTPException, status
from sqlmodel import select
from app.models import Issue, IssueOut, IssueCreate, IssueUpdate
from app.api.deps import SessionDep, TokenDep

router = APIRouter()

@router.get("/")
def read_issues(session: SessionDep) -> list[IssueOut]:
    """
    Retrieve all issues.
    """
    statement = select(Issue)
    return session.exec(statement).all()