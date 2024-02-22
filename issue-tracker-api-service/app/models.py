import uuid
from datetime import datetime
from pydantic import BaseModel
from sqlmodel import SQLModel, Field
from sqlalchemy import text
from typing import List, Optional, Union

class TokenUser(BaseModel):
    id: str
    username: str
    email: str
    first_name: str
    last_name: str
    realm_roles: List
    client_roles: List

class UserBase(SQLModel):
    id: Optional[uuid.UUID] = None
    username: str
    first_name: str
    last_name: str

class User(UserBase, table=True):
    __tablename__: str = "users"

    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False
    )

class UserOut(UserBase):
    id: uuid.UUID


class ProjectBase(SQLModel):
    project_name: Optional[str]

class Project(ProjectBase, table=True):
    __tablename__: str = "projects"
    
    id: Optional[int] = Field(
        default=None, 
        primary_key=True,
        index=True,
        nullable=False
    )
    project_id: Optional[str] = Field(
        default=None,
        nullable=False
    )
    created_by: Union[str, None] = Field(
        index=True,
    )
    create_date: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={
            "server_default": text("current_timestamp")
        }
    )
    modified_by: Union[str, None] = Field(
        index=True,
    )
    modified_date: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={
            "server_default": text("current_timestamp"),
            "onupdate": text("current_timestamp")
       }
    )

class ProjectCreate(ProjectBase):
    project_name: str
    created_by: Union[str, None]
    modified_by: Union[str, None]

class ProjectUpdate(ProjectBase):
    project_name: str