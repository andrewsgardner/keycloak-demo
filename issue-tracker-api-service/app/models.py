import uuid
from datetime import datetime, date
from pydantic import BaseModel
from sqlmodel import SQLModel, Field
from sqlalchemy import text
from enum import Enum
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

class ProjectUpdate(ProjectBase):
    project_name: str
    modified_by: Union[str, None]

class ProjectOut(ProjectBase):
    id: int
    created_by: Union[str, None]
    create_date: datetime
    modified_by: Union[str, None]
    modified_date: datetime

class IssueStatus(Enum):
    OPEN = "Open"
    ONHOLD = "On-Hold"
    CLOSED = "Closed"

class IssuePriority(Enum):
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"

class IssueBase(SQLModel):
    issue_summary: str
    issue_description: Union[str, None]

class Issue(IssueBase, table=True):
    __tablename__: str = "issues"

    id: Optional[int] = Field(
        default=None, 
        primary_key=True,
        index=True,
        nullable=False
    )
    issue_status: str = Field(
        default=IssueStatus.OPEN
    )
    issue_priority: Union[str, None] = Field(
        default=None,
        nullable=True
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
    assigned_to: Union[str, None] = Field(
        index=True,
    )
    target_resolution_date: Union[date, None] = Field(
        default=None,
        nullable=True
    )
    actual_resolution_date: Union[date, None] = Field(
        default=None,
        nullable=True
    )
    resolution_summary: Union[str, None] = Field(
        nullable=True
    )

class IssueCreate(IssueBase):
    created_by: str
    issue_priority: Union[str, None]
    assigned_to: Union[str, None]
    target_resolution_date: Union[date, None]

class IssueUpdate(IssueBase):
    modified_by: str

class IssueOut(IssueBase):
    id: int
    issue_status: str
    issue_priority: Union[str, None]
    created_by: str
    create_date: datetime
    modified_by: str
    modified_date: datetime
    assigned_to: Union[str, None]
    target_resolution_date: Union[date, None]
    actual_resolution_date: Union[date, None]
    resolution_summary: Union[str, None]