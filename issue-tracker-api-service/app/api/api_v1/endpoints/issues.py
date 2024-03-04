from fastapi import APIRouter, HTTPException, status
from sqlmodel import select
from app.models import Issue, IssueOut, IssueCreate, IssueUpdate
from app.api.deps import SessionDep, TokenDep

router = APIRouter()

@router.get("/")
def read_issues(session: SessionDep, token: TokenDep) -> list[IssueOut]:
    """
    Retrieve all issues.
    """
    statement = select(Issue)
    return session.exec(statement).all()

@router.get("/{id}")
def read_issue(session: SessionDep, token: TokenDep, id: int) -> IssueOut:
    """
    Retrieve issue by id.
    """
    issue = session.get(Issue, id)

    if not issue:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Issue not found.")

    return issue

@router.post("/")
def create_issue(*, session: SessionDep, token: TokenDep, issue_in: IssueCreate) -> IssueOut:
    """
    Create an issue.
    """
    issue = Issue(
        issue_summary=issue_in.issue_summary,
        issue_description=issue_in.issue_description,
        created_by=issue_in.created_by,
        modified_by=issue_in.created_by,
        issue_priority=issue_in.issue_priority,
        assigned_to=issue_in.assigned_to,
        target_resolution_date=issue_in.target_resolution_date
    )
    model = Issue.model_validate(issue)
    session.add(model)
    session.commit()
    session.refresh(model)
    return model

@router.patch("/{id}")
def update_issue(*, session: SessionDep, token: TokenDep, id: int, issue_in: IssueUpdate) -> IssueOut:
    """
    Update an issue.
    """
    issue = session.get(Issue, id)

    if not issue:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Issue not found.")

    issue.issue_summary = issue_in.issue_summary
    issue.issue_description = issue_in.issue_description
    issue.modified_by = issue_in.modified_by
    issue.issue_priority = issue_in.issue_priority
    issue.target_resolution_date = issue_in.target_resolution_date
    issue.actual_resolution_date = issue_in.actual_resolution_date
    issue.resolution_summary = issue_in.resolution_summary
    issue.assigned_to = issue_in.assigned_to
    session.add(issue)
    session.commit()
    session.refresh(issue)
    return issue

@router.delete("/{id}")
def delete_issue(session: SessionDep, token: TokenDep, id: int) -> IssueOut:
    """
    Delete an issue.
    """
    issue = session.get(Issue, id)

    if not issue:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Issue not found.")

    session.delete(issue)
    session.commit()
    return issue
