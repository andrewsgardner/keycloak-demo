import uuid
from datetime import datetime
from sqlmodel import Field, SQLModel
from pydantic import BaseModel
from sqlalchemy import text
from typing import Union, Optional

class TokenUser(BaseModel):
    id: str
    username: str
    email: str
    first_name: str
    last_name: str
    realm_roles: list
    client_roles: list

class UserBase(SQLModel):
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

class PostBase(SQLModel):
    post_text: Optional[str]

class Post(PostBase, table=True):
    __tablename__: str = "posts"
    
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False
    )
    userid: Union[str, None] = Field(
        index=True,
    )
    create_date: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={
            "server_default": text("current_timestamp")
        }
    )
    update_date: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={
            "server_default": text("current_timestamp"),
            "onupdate": text("current_timestamp")
       }
    )

class PostCreate(PostBase):
    post_text: str
    userid: str

class PostUpdate(PostBase):
    post_text: str

class PostOut(PostBase):
    id: uuid.UUID
    userid: Union[str, None]
    create_date: datetime
    update_date: datetime