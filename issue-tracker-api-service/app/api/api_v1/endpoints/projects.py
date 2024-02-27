from fastapi import APIRouter, HTTPException, status
from sqlmodel import select
from app.models import Project, ProjectOut, ProjectCreate, ProjectUpdate
from app.api.deps import SessionDep, TokenDep

router = APIRouter()

@router.get("/")
def read_projects(session: SessionDep, token: TokenDep) -> list[ProjectOut]:
    """
    Retrieve all projects.
    """
    statement = select(Project)
    return session.exec(statement).all()

@router.get("/{id}")
def read_projects(session: SessionDep, token: TokenDep, id: int) -> ProjectOut:
    """
    Retrieve project by id.
    """
    project = session.get(Project, id)

    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
    
    return project

@router.post("/")
def create_project(*, session: SessionDep, token: TokenDep, project_in: ProjectCreate) -> ProjectOut:
    """
    Create a project.
    """
    project = Project(
        project_name=project_in.project_name,
        created_by=project_in.created_by,
        modified_by=project_in.created_by
    )
    model = Project.model_validate(project)
    session.add(model)
    session.commit()
    session.refresh(model)
    return model

@router.patch("/{id}")
def update_project(*, session: SessionDep, token: TokenDep, id: int, project_in: ProjectUpdate) -> ProjectOut:
    """
    Update a project.
    """
    project = session.get(Project, id)

    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
    
    project.project_name = project_in.project_name
    project.modified_by = project_in.modified_by
    session.add(project)
    session.commit()
    session.refresh(project)
    return project

@router.delete("/{id}")
def delete_project(session: SessionDep, token: TokenDep, id: int) -> ProjectOut:
    """
    Delete a project.
    """
    project = session.get(Project, id)

    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
    
    session.delete(project)
    session.commit()
    return project