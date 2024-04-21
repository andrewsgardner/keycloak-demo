from fastapi import APIRouter, HTTPException, status
from sqlmodel import select
from app.models import Comment, CommentCreate, CommentUpdate, CommentOut
from app.api.deps import SessionDep, TokenDep
from uuid import UUID

router = APIRouter()

@router.get("/")
def read_comments(session: SessionDep, token: TokenDep, related_issue_id: int) -> list[CommentOut]:
    """
    Retrieve all comments by issue id.
    """
    statement = select(Comment).where(Comment.related_issue_id == related_issue_id)
    return session.exec(statement).all()

@router.get("/{id}")
def read_comment(session: SessionDep, token: TokenDep, id: UUID) -> CommentOut:
    """
    Retrieve comment by id.
    """
    comment = session.get(Comment, id)

    if not comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found.")

    return comment

@router.post("/")
def create_comment(*, session: SessionDep, token: TokenDep, comment_in: CommentCreate) -> CommentOut:
    """
    Create a comment.
    """
    comment = Comment.from_orm(comment_in)
    session.add(comment)
    session.commit()
    session.refresh(comment)
    return comment

@router.patch("/{id}")
def update_comment(*, session: SessionDep, token: TokenDep, id: UUID, comment_in: CommentUpdate) -> CommentOut:
    """
    Update a comment.
    """
    comment = session.get(Comment, id)

    if not comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found.")

    comment.comment_text = comment_in.comment_text
    session.add(comment)
    session.commit()
    session.refresh(comment)
    return comment

@router.delete("/{id}")
def delete_comment(session: SessionDep, token: TokenDep, id: UUID) -> CommentOut:
    """
    Delete a comment.
    """
    comment = session.get(Comment, id)

    if not comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found.")

    session.delete(comment)
    session.commit()
    return comment
