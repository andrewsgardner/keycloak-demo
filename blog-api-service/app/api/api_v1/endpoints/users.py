from fastapi import APIRouter, Depends
from sqlmodel import select
from app.api.deps import SessionDep, get_user_info
from app.models import TokenUser, User, UserOut

router = APIRouter()

@router.get("/")
def read_users(session: SessionDep, skip: int = 0, limit: int = 100, token_user: TokenUser = Depends(get_user_info))-> list[UserOut]:
    """
    Retrieve all users.
    """
    statement = select(User).offset(skip).limit(limit)
    return session.exec(statement).all()