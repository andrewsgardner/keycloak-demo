from fastapi import APIRouter, Depends
from app.api.deps import get_user_info
from app.models import User

router = APIRouter()

@router.get("/")
def read_users(user: User = Depends(get_user_info)):
    """
    Retrieve all users.
    """
    return user