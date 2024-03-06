from fastapi import APIRouter, HTTPException, status
from sqlmodel import select
from app.api.deps import SessionDep, TokenDep
from app.models import User, UserOut
from uuid import UUID

router = APIRouter()

@router.get("/")
def read_users(session: SessionDep, token: TokenDep, skip: int = 0, limit: int = 100)-> list[UserOut]:
    """
    Retrieve all users.
    """
    statement = select(User).offset(skip).limit(limit)
    return session.exec(statement).all()

@router.get("/{id}")
def read_user(session: SessionDep, token: TokenDep, id: UUID) -> UserOut:
    """
    Retrieve user by id.
    """
    user = session.get(User, id)

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    
    return user