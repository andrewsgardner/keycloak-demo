from fastapi import APIRouter, HTTPException, Depends, Query
from sqlmodel import select
from app.api.deps import SessionDep, get_user_info
from app.models import Post, PostOut, PostCreate, PostUpdate, TokenUser
from app.schemas import PostSchema, PaginatedResponse
from app.utils import paginate
from uuid import UUID

router = APIRouter()

@router.get("/", response_model=PaginatedResponse[PostSchema])
def read_posts(session: SessionDep, limit: int = Query(10, ge=0), offset: int = Query(0, ge=0), token_user: TokenUser = Depends(get_user_info)) -> PaginatedResponse[PostSchema]:
    """
    Retrieve posts by page.
    """
    query = select(Post)
    
    return paginate(session, query, limit, offset)
    

@router.get("/{id}")
def read_post(session: SessionDep, id: UUID, token_user: TokenUser = Depends(get_user_info)) -> PostOut:
    """
    Retrieve post by id.
    """
    post = session.get(Post, id)

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return post

@router.post("/")
def create_post(*, session: SessionDep, post_in: PostCreate, token_user: TokenUser = Depends(get_user_info)) -> PostOut:
    """
    Create a post.
    """
    post = Post.from_orm(post_in)
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@router.patch("/{id}")
def update_post(*, session: SessionDep, id: UUID, post_in: PostUpdate, token_user: TokenUser = Depends(get_user_info)) -> PostOut:
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

@router.delete("/{id}")
def delete_post(session: SessionDep, id: UUID, token_user: TokenUser = Depends(get_user_info)) -> PostOut:
    """
    Delete a post.
    """
    post = session.get(Post, id)

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    session.delete(post)
    session.commit()
    return post