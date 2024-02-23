from fastapi import APIRouter, HTTPException, status, Depends
from sqlmodel import select
from uuid import UUID
from app.models import TokenUser, User, UserOut
from app.api.deps import SessionDep, get_user_info

router = APIRouter()

@router.get("/")
def read_users(session: SessionDep, token_user: TokenUser = Depends(get_user_info)) -> list[UserOut]:
    """
    Retrieve all users.
    """
    statement = select(User)
    return session.exec(statement).all()

@router.get("/{id}")
def read_user(session: SessionDep, id: UUID) -> UserOut:
    """
    Retrieve user by id.
    """
    user = session.get(User, id)

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    return user