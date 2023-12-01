from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def read_users():
    """
    Retrieve all users.
    """
    return {"Hello": "World"}