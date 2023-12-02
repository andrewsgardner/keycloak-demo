from fastapi import APIRouter
from sqlmodel import select
from app.api.deps import SessionDep
from app.models import Post, PostOut

router = APIRouter()

@router.get("/")
def read_posts(session: SessionDep, skip: int = 0, limit: int = 100) -> list[PostOut]:
    """
    Retrieve all posts.
    """
    statement = select(Post).offset(skip).limit(limit)
    return session.exec(statement).all()