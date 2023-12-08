from fastapi import APIRouter, HTTPException
from sqlmodel import select
from app.api.deps import SessionDep
from app.models import Post, PostOut, PostCreate, PostUpdate
from uuid import UUID

router = APIRouter()

@router.get("/")
def read_posts(session: SessionDep, skip: int = 0, limit: int = 100) -> list[PostOut]:
    """
    Retrieve all posts.
    """
    statement = select(Post).offset(skip).limit(limit)
    return session.exec(statement).all()

@router.get("/{id}")
def read_post(session: SessionDep, id: UUID) -> PostOut:
    """
    Retrieve post by id.
    """
    post = session.get(Post, id)

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return post

@router.post("/")
def create_post(*, session: SessionDep, post_in: PostCreate) -> PostOut:
    """
    Create a post.
    """
    post = Post.from_orm(post_in)
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@router.put("/{id}")
def update_post(*, session: SessionDep, id: UUID, post_in: PostUpdate) -> PostOut:
    """
    Update a post.
    """
    post = session.get(Post, id)

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    post.post_text = post_in.post_text
    session.add(post)
    session.commit()
    session.refresh(post)
    return post