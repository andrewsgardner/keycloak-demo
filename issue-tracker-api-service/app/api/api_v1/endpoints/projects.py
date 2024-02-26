from fastapi import APIRouter, HTTPException, status
from sqlmodel import select
from app.models import Project, ProjectOut, ProjectCreate
from app.api.deps import SessionDep, TokenDep

router = APIRouter()

@router.get("/")
def read_projects(session: SessionDep) -> list[ProjectOut]:
    """
    Retrieve all projects.
    """
    statement = select(Project)
    return session.exec(statement).all()

@router.get("/{id}")
def read_projects(session: SessionDep, id: int) -> ProjectOut:
    """
    Retrieve project by id.
    """
    project = session.get(Project, id)

    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
    
    return project

@router.post("/")
def create_project(*, session: SessionDep, project_in: ProjectCreate) -> ProjectOut:
    """
    Create a project.
    """
    project = Project.model_validate(project_in)
    session.add(project)
    session.commit()
    session.refresh(project)
    return project