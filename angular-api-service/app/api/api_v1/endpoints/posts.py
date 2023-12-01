from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def read_posts():
    """
    Retrieve all posts.
    """
    return {"Hello": "World"}