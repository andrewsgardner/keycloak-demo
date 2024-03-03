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

@router.get("/{id}")
def read_issue(session: SessionDep, id: int) -> IssueOut:
    """
    Retrieve issue by id.
    """
    issue = session.get(Issue, id)

    if not issue:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Issue not found.")

    return issue

@router.post("/")
def create_issue(*, session: SessionDep, project_in: IssueCreate) -> IssueOut:
    """
    Create an issue.
    """
    issue = Issue(
        issue_summary=project_in.issue_summary,
        issue_description=project_in.issue_description,
        created_by=project_in.created_by,
        modified_by=project_in.created_by,
        issue_priority=project_in.issue_priority,
        assigned_to=project_in.assigned_to,
        target_resolution_date=project_in.target_resolution_date
    )
    model = Issue.model_validate(issue)
    session.add(model)
    session.commit()
    session.refresh(model)
    return model