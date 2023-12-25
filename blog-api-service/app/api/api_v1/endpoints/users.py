from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select
from app.api.deps import SessionDep, get_user_info
from app.models import TokenUser, User, UserOut
from uuid import UUID

router = APIRouter()

@router.get("/")
def read_users(session: SessionDep, skip: int = 0, limit: int = 100, token_user: TokenUser = Depends(get_user_info))-> list[UserOut]:
    """
    Retrieve all users.
    """
    statement = select(User).offset(skip).limit(limit)
    return session.exec(statement).all()

@router.get("/{id}")
def read_user(session: SessionDep, id: UUID, token_user: TokenUser = Depends(get_user_info)) -> UserOut:
    """
    Retrieve user by id.
    """
    user = session.get(User, id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user