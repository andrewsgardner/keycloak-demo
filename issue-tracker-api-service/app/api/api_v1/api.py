from fastapi import APIRouter
from app.api.api_v1.endpoints import users, projects, issues, comments

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(issues.router, prefix="/issues", tags=["issues"])
api_router.include_router(comments.router, prefix="/comments", tags=["comments"])